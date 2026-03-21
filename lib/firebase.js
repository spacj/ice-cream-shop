// Firebase configuration - must be provided via environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase only on client-side to avoid prerendering errors
let app = null;
let authInstance = null;
let dbInstance = null;
let initialized = false;
let initPromise = null;

async function initializeFirebase() {
  if (initialized) return;
  if (initPromise) return initPromise;
  
  initPromise = (async () => {
    if (typeof window === 'undefined') return;
    
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.warn('Firebase configuration missing. Check your .env.local file.');
      return;
    }
    
    try {
      const firebaseModule = await import('firebase/app');
      const { initializeApp } = firebaseModule;
      
      app = initializeApp(firebaseConfig);
      
      const authModule = await import('firebase/auth');
      const { getAuth } = authModule;
      authInstance = getAuth(app);
      
      const firestoreModule = await import('firebase/firestore');
      const { getFirestore } = firestoreModule;
      dbInstance = getFirestore(app);
      
      initialized = true;
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  })();
  
  return initPromise;
}

// Getter functions that ensure initialization is complete
export async function getAuth() {
  await initializeFirebase();
  return authInstance;
}

export async function getDb() {
  await initializeFirebase();
  return dbInstance;
}

export function isFirebaseReady() {
  return initialized;
}

export default { getAuth, getDb, isFirebaseReady };
