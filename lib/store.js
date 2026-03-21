import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: false,
  
  initializeAuth: async () => {
    // Import Firebase dynamically to avoid SSR errors
    const { auth } = await import('./firebase');
    
    if (!auth) {
      console.warn('Firebase auth not initialized');
      set({ user: null, isAdmin: false, loading: false });
      return;
    }

    const { onAuthStateChanged } = await import('firebase/auth');
    const { signInWithEmailAndPassword, signOut } = await import('firebase/auth');
    
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user is admin
        const { db } = await import('./firebase');
        if (db) {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
            set({
              user: firebaseUser,
              isAdmin: adminDoc.exists(),
              loading: false,
            });
          } catch (error) {
            console.error('Error checking admin status:', error);
            set({
              user: firebaseUser,
              isAdmin: false,
              loading: false,
            });
          }
        } else {
          set({ user: firebaseUser, isAdmin: false, loading: false });
        }
      } else {
        set({ user: null, isAdmin: false, loading: false });
      }
    });
  },

  login: async (email, password) => {
    const { auth } = await import('./firebase');
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  logout: async () => {
    const { auth } = await import('./firebase');
    if (auth) {
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
    }
    set({ user: null, isAdmin: false });
  },
}));
