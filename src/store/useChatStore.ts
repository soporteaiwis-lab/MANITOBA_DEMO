import { create } from 'zustand';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  toggleChat: () => void;
  addMessage: (text: string, sender: 'user' | 'bot') => void;
  setTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de la Manitoba Chilean Association. ¿En qué te puedo ayudar hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ],
  isTyping: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (text, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          text,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  setTyping: (isTyping) => set({ isTyping }),
}));
