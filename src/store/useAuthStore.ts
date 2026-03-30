import { create } from 'zustand';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Listen to auth state changes
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true,
    login: async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    logout: async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  };
});
