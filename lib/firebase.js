// Firebase configuration from environment variables
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
  if (initialized && authInstance && dbInstance) {
    return { app, auth: authInstance, db: dbInstance };
  }
  
  if (initPromise) {
    return initPromise;
  }
  
  initPromise = (async () => {
    console.log('[Firebase] Starting initialization...');
    console.log('[Firebase] Config:', {
      hasApiKey: !!firebaseConfig.apiKey,
      hasAuthDomain: !!firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
    });
    
    if (typeof window === 'undefined') {
      console.log('[Firebase] Skipping - server side');
      return null;
    }
    
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.error('[Firebase] Missing config! env vars:', {
        apiKey: firebaseConfig.apiKey ? 'set' : 'MISSING',
        projectId: firebaseConfig.projectId ? 'set' : 'MISSING',
      });
      return null;
    }
    
    try {
      console.log('[Firebase] Importing firebase/app...');
      const { default: firebase } = await import('firebase/app');
      console.log('[Firebase] firebase/app imported');
      
      console.log('[Firebase] Initializing app...');
      app = firebase.initializeApp(firebaseConfig);
      console.log('[Firebase] App initialized');
      
      console.log('[Firebase] Getting auth...');
      const { getAuth } = await import('firebase/auth');
      authInstance = getAuth(app);
      console.log('[Firebase] Auth instance created');
      
      console.log('[Firebase] Getting Firestore...');
      const { getFirestore } = await import('firebase/firestore');
      dbInstance = getFirestore(app);
      console.log('[Firebase] Firestore instance created');
      
      initialized = true;
      console.log('[Firebase] Initialization complete!');
      
      return { app, auth: authInstance, db: dbInstance };
    } catch (error) {
      console.error('[Firebase] Initialization failed:', error);
      initialized = false;
      return null;
    }
  })();
  
  return initPromise;
}

export async function getAuth() {
  const result = await initializeFirebase();
  return result?.auth || null;
}

export async function getDb() {
  const result = await initializeFirebase();
  return result?.db || null;
}

export { initializeFirebase };
