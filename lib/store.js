import { create } from 'zustand';
import { initializeFirebase } from './firebase';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAdmin: false,
  loading: true,
  initialized: false,
  error: null,
  
  initializeAuth: async () => {
    const state = get();
    if (state.initialized) return;
    
    try {
      console.log('[AuthStore] Initializing...');
      const result = await initializeFirebase();
      
      if (!result || !result.auth) {
        console.error('[AuthStore] Firebase initialization failed');
        set({ error: 'Firebase not initialized. Check console for details.', loading: false, initialized: true });
        return;
      }

      console.log('[AuthStore] Setting up auth listener...');
      const { onAuthStateChanged } = await import('firebase/auth');
      
      onAuthStateChanged(result.auth, async (firebaseUser) => {
        console.log('[AuthStore] Auth state changed:', firebaseUser ? 'logged in' : 'logged out');
        
        if (firebaseUser) {
          if (result.db) {
            try {
              const { doc, getDoc } = await import('firebase/firestore');
              const adminDoc = await getDoc(doc(result.db, 'admins', firebaseUser.uid));
              console.log('[AuthStore] Admin check:', adminDoc.exists() ? 'is admin' : 'not admin');
              set({
                user: firebaseUser,
                isAdmin: adminDoc.exists(),
                loading: false,
                initialized: true,
                error: null,
              });
            } catch (error) {
              console.error('[AuthStore] Admin check failed:', error);
              set({
                user: firebaseUser,
                isAdmin: false,
                loading: false,
                initialized: true,
                error: null,
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
      console.error('[AuthStore] Initialization error:', error);
      set({ error: error.message, loading: false, initialized: true });
    }
  },

  login: async (email, password) => {
    console.log('[AuthStore] Login attempt for:', email);
    const state = get();
    
    if (!state.initialized) {
      console.log('[AuthStore] Waiting for initialization...');
      await state.initializeAuth();
    }
    
    const result = await initializeFirebase();
    
    if (!result || !result.auth) {
      console.error('[AuthStore] Login failed - Firebase not ready');
      throw new Error('Firebase auth not ready. Please refresh and try again.');
    }
    
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    console.log('[AuthStore] Calling Firebase signIn...');
    
    const userCredential = await signInWithEmailAndPassword(result.auth, email, password);
    console.log('[AuthStore] Login successful:', userCredential.user.uid);
    return userCredential.user;
  },

  logout: async () => {
    try {
      const result = await initializeFirebase();
      if (result?.auth) {
        const { signOut } = await import('firebase/auth');
        await signOut(result.auth);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ user: null, isAdmin: false });
  },
}));
