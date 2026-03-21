import { create } from 'zustand';
import { getDb, getAuth } from './firebase';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAdmin: false,
  loading: true,
  initialized: false,
  
  initializeAuth: async () => {
    const state = get();
    if (state.initialized) return;
    
    try {
      const auth = await getAuth();
      
      if (!auth) {
        console.warn('Firebase auth not initialized');
        set({ loading: false, initialized: true });
        return;
      }

      const { onAuthStateChanged } = await import('firebase/auth');
      
      // Set up the listener immediately
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
                initialized: true,
              });
            } catch (error) {
              console.error('Error checking admin status:', error);
              set({
                user: firebaseUser,
                isAdmin: false,
                loading: false,
                initialized: true,
              });
            }
          } else {
            set({ user: firebaseUser, isAdmin: false, loading: false, initialized: true });
          }
        } else {
          set({ user: null, isAdmin: false, loading: false, initialized: true });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ user: null, isAdmin: false, loading: false, initialized: true });
    }
  },

  login: async (email, password) => {
    // Wait for initialization if needed
    const state = get();
    if (!state.initialized) {
      await state.initializeAuth();
    }
    
    const auth = await getAuth();
    if (!auth) {
      throw new Error('Firebase auth not initialized. Please refresh the page.');
    }
    
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  logout: async () => {
    try {
      const auth = await getAuth();
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
