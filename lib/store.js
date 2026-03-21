import { create } from 'zustand';
import { getDb } from './firebase';

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  
  initializeAuth: async () => {
    try {
      const auth = await import('./firebase').then(m => m.getAuth());
      
      if (!auth) {
        console.warn('Firebase auth not initialized');
        set({ user: null, isAdmin: false, loading: false });
        return;
      }

      const authModule = await import('firebase/auth');
      const { onAuthStateChanged } = authModule;
      
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const db = await getDb();
          if (db) {
            try {
              const { doc, getDoc } = await import('firebase/firestore');
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
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ user: null, isAdmin: false, loading: false });
    }
  },

  login: async (email, password) => {
    const auth = await import('./firebase').then(m => m.getAuth());
    if (!auth) {
      throw new Error('Firebase auth not initialized. Please refresh the page.');
    }
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  logout: async () => {
    try {
      const auth = await import('./firebase').then(m => m.getAuth());
      if (auth) {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ user: null, isAdmin: false });
  },
}));
