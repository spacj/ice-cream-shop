import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - must be provided via environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase configuration at runtime
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn(
    'Firebase configuration is incomplete. Please configure environment variables:\n' +
    'NEXT_PUBLIC_FIREBASE_API_KEY\n' +
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n' +
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID\n' +
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n' +
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n' +
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
