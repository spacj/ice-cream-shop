import { create } from 'zustand';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  
  initializeAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
        set({
          user: firebaseUser,
          isAdmin: adminDoc.exists(),
          loading: false,
        });
      } else {
        set({ user: null, isAdmin: false, loading: false });
      }
    });
  },

  login: async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, isAdmin: false });
  },
}));
