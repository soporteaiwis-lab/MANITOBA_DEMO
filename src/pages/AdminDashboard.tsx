import { useState, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Upload, FileText, Database, Plus, Trash2, Loader2, LogOut } from 'lucide-react';
import { chunkText, generateEmbeddings } from '../lib/rag';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function AdminDashboard() {
  const { user, loading, login, logout } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [manualText, setManualText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Database size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel de Administración</h2>
          <p className="text-gray-600 mb-8">Inicia sesión con tu cuenta de administrador para gestionar la base de conocimientos.</p>
          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Iniciar Sesión con Google
          </button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processTextAndSave = async (text: string, sourceName: string) => {
    try {
      setIsProcessing(true);
      setProgress('Dividiendo el texto en fragmentos (chunks)...');
      
      const chunks = chunkText(text, 1000, 200);
      setProgress(`Generando embeddings para ${chunks.length} fragmentos...`);
      
      // We process in batches to avoid hitting API limits
      const batchSize = 10;
      for (let i = 0; i < chunks.length; i += batchSize) {
        const batchChunks = chunks.slice(i, i + batchSize);
        setProgress(`Procesando lote ${Math.floor(i/batchSize) + 1} de ${Math.ceil(chunks.length/batchSize)}...`);
        
        const embeddings = await generateEmbeddings(batchChunks);
        
        // Save to Firestore
        setProgress('Guardando en la base de datos...');
        for (let j = 0; j < batchChunks.length; j++) {
          await addDoc(collection(db, 'knowledge_base'), {
            content: batchChunks[j],
            embedding: embeddings[j],
            source: sourceName,
            createdAt: serverTimestamp(),
          });
        }
      }
      
      setProgress('¡Proceso completado con éxito!');
      setFile(null);
      setManualText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setTimeout(() => {
        setIsProcessing(false);
        setProgress('');
      }, 3000);
      
    } catch (error) {
      console.error("Error processing text:", error);
      setProgress('Error durante el procesamiento. Revisa la consola.');
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      if (text) {
        await processTextAndSave(text, file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleManualUpload = async () => {
    if (!manualText.trim()) return;
    await processTextAndSave(manualText, 'Entrada Manual (Admin)');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500">Manitoba Chilean Assoc.</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
            <Database size={20} />
            Base de Conocimiento
          </a>
          {/* Add more nav items here later (Events, Users, etc.) */}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img src={user.photoURL || ''} alt="User" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión del Chatbot (RAG)</h1>
            <p className="text-gray-600">Sube historiales de chat o ingresa preguntas frecuentes manualmente para entrenar al asistente virtual.</p>
          </div>

          {isProcessing && (
            <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
              <Loader2 className="animate-spin text-blue-600 shrink-0" size={24} />
              <p className="text-blue-800 font-medium">{progress}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* File Upload Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Upload size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Subir Historial (.txt)</h3>
              <p className="text-gray-600 text-sm mb-6">Sube el archivo exportado con años de conversaciones. El sistema lo dividirá y vectorizará automáticamente.</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <FileText className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-sm text-gray-600 font-medium">
                  {file ? file.name : 'Haz clic para seleccionar un archivo'}
                </p>
                <input
                  type="file"
                  accept=".txt,.json"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              
              <button
                onClick={handleFileUpload}
                disabled={!file || isProcessing}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Procesar Archivo
              </button>
            </div>

            {/* Manual Entry Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Plus size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ingreso Manual (FAQ)</h3>
              <p className="text-gray-600 text-sm mb-6">Ingresa directamente preguntas frecuentes o información clave que el bot deba saber.</p>
              
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Ejemplo: La asociación se reúne todos los primeros sábados de mes en el centro comunitario..."
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              ></textarea>
              
              <button
                onClick={handleManualUpload}
                disabled={!manualText.trim() || isProcessing}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar en Base de Conocimiento
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
