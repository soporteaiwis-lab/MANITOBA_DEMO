import { GoogleGenAI } from "@google/genai";
import { db } from './firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

// Initialize Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Splits a large text into smaller chunks based on paragraphs or a maximum character limit.
 * This is a simple chunking strategy. For more advanced use cases, consider semantic chunking.
 */
export function chunkText(text: string, maxChunkSize: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + maxChunkSize;

    // If we're not at the end of the text, try to find a natural break point (like a newline or period)
    if (endIndex < text.length) {
      const lastNewline = text.lastIndexOf('\n', endIndex);
      const lastPeriod = text.lastIndexOf('. ', endIndex);
      
      // Prefer breaking at a newline, then a period, otherwise just cut at maxChunkSize
      if (lastNewline > startIndex + maxChunkSize / 2) {
        endIndex = lastNewline + 1;
      } else if (lastPeriod > startIndex + maxChunkSize / 2) {
        endIndex = lastPeriod + 2;
      }
    }

    const chunk = text.slice(startIndex, endIndex).trim();
    if (chunk) {
      chunks.push(chunk);
    }

    // Move start index forward, accounting for overlap
    startIndex = endIndex - overlap;
    
    // Prevent infinite loops if overlap is too large
    if (startIndex <= 0 || endIndex >= text.length) {
      startIndex = endIndex;
    }
  }

  return chunks;
}

/**
 * Generates embeddings for an array of text chunks using Gemini's embedding model.
 */
export async function generateEmbeddings(chunks: string[]): Promise<number[][]> {
  try {
    const result = await ai.models.embedContent({
      model: 'gemini-embedding-2-preview',
      contents: chunks,
    });
    
    // The API returns an array of embeddings corresponding to the input chunks
    return result.embeddings?.map(e => e.values || []) || [];
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

/**
 * Calculates the cosine similarity between two vectors.
 * Returns a value between -1 and 1, where 1 means identical.
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Searches the knowledge base for chunks similar to the query.
 * Note: In a production environment with thousands of chunks, 
 * you should use a dedicated vector database (like Pinecone) 
 * or Firestore's native vector search (if available in your tier).
 * This implementation fetches all chunks and calculates similarity client-side,
 * which is fine for a prototype/MVP but won't scale well.
 */
export async function searchKnowledgeBase(queryText: string, topK: number = 3): Promise<string[]> {
  try {
    // 1. Generate embedding for the user's query
    const queryEmbeddingResult = await generateEmbeddings([queryText]);
    const queryVector = queryEmbeddingResult[0];
    
    if (!queryVector || queryVector.length === 0) {
      return [];
    }

    // 2. Fetch all chunks from Firestore
    // WARNING: This is a brute-force approach for the MVP.
    const kbSnapshot = await getDocs(collection(db, 'knowledge_base'));
    
    if (kbSnapshot.empty) {
      return [];
    }

    // 3. Calculate similarity for each chunk
    const results: { content: string; similarity: number }[] = [];
    
    kbSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.embedding && data.content) {
        const similarity = cosineSimilarity(queryVector, data.embedding);
        results.push({
          content: data.content,
          similarity
        });
      }
    });

    // 4. Sort by similarity (descending) and take top K
    results.sort((a, b) => b.similarity - a.similarity);
    
    // Only return chunks with a reasonable similarity score (e.g., > 0.6)
    return results
      .filter(r => r.similarity > 0.6)
      .slice(0, topK)
      .map(r => r.content);
      
  } catch (error) {
    console.error("Error searching knowledge base:", error);
    return [];
  }
}

/**
 * Generates a response using Gemini, augmented with context from the knowledge base.
 */
export async function generateRAGResponse(userQuery: string, chatHistory: {role: string, content: string}[]): Promise<string> {
  try {
    // 1. Retrieve relevant context
    const relevantChunks = await searchKnowledgeBase(userQuery);
    
    // 2. Construct the prompt with context
    let contextText = "";
    if (relevantChunks.length > 0) {
      contextText = "Información relevante de la base de conocimientos:\n\n" + 
                    relevantChunks.map((chunk, i) => `[Documento ${i+1}]: ${chunk}`).join("\n\n") + 
                    "\n\n";
    } else {
      contextText = "No se encontró información específica en la base de conocimientos para esta consulta.\n\n";
    }

    const systemInstruction = `
Eres el asistente virtual oficial de la Manitoba Chilean Association (MCA).
Tu objetivo es ayudar a la comunidad chilena en Manitoba, Canadá, respondiendo preguntas sobre eventos, servicios, trámites y apoyo comunitario.

REGLAS IMPORTANTES:
1. Responde SIEMPRE en español, con un tono amable, empático y profesional.
2. Utiliza la "Información relevante de la base de conocimientos" proporcionada para responder.
3. Si la respuesta NO está en la base de conocimientos, indícalo educadamente y sugiere contactar a la asociación directamente a través del formulario de contacto o al correo contacto@manitobachilean.ca. NO inventes información sobre eventos, fechas o políticas de la asociación.
4. Mantén tus respuestas concisas y directas al punto.
5. Puedes usar formato Markdown básico (negritas, listas) para mejorar la legibilidad.
`;

    // 3. Format chat history for Gemini
    // Gemini expects a specific format for multi-turn conversations
    // We need to alternate 'user' and 'model' roles
    
    // Start with the system instruction and context as the first user message
    const initialMessage = `${systemInstruction}\n\n${contextText}\n\nPregunta del usuario: ${userQuery}`;
    
    // For a simple implementation, we'll just send the current query with context
    // In a more complex app, we'd pass the full history properly formatted
    
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: initialMessage,
      config: {
        temperature: 0.3, // Lower temperature for more factual responses
      }
    });

    return response.text || "Lo siento, hubo un problema al generar la respuesta.";
    
  } catch (error) {
    console.error("Error generating RAG response:", error);
    return "Lo siento, estoy experimentando dificultades técnicas en este momento. Por favor, intenta de nuevo más tarde o contáctanos directamente.";
  }
}

