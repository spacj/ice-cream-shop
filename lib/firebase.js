const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

let app = null;
let authInstance = null;
let dbInstance = null;
let initialized = false;
let initPromise = null;

async function initializeFirebase() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (initialized && authInstance && dbInstance) {
    return { app, auth: authInstance, db: dbInstance };
  }
  
  if (initPromise) {
    return initPromise;
  }
  
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn('[Firebase] Missing environment variables. Firebase will not be available.');
    return null;
  }
  
  initPromise = (async () => {
    try {
      const { initializeApp } = await import('firebase/app');
      app = initializeApp(firebaseConfig);
      
      const { getAuth } = await import('firebase/auth');
      authInstance = getAuth(app);
      
      const { getFirestore } = await import('firebase/firestore');
      dbInstance = getFirestore(app);
      
      initialized = true;
      return { app, auth: authInstance, db: dbInstance };
    } catch (error) {
      console.error('[Firebase] Initialization failed:', error);
      return null;
    }
  })();
  
  return initPromise;
}

export async function getAuth() {
  if (typeof window === 'undefined') return null;
  const result = await initializeFirebase();
  return result?.auth || null;
}

export async function getDb() {
  if (typeof window === 'undefined') return null;
  const result = await initializeFirebase();
  return result?.db || null;
}

export { initializeFirebase };
