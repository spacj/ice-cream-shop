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
let storageInstance = null;

if (typeof window !== 'undefined') {
  // Only import and initialize Firebase on the client
  import('firebase/app').then((firebaseModule) => {
    const { initializeApp } = firebaseModule;
    
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      app = initializeApp(firebaseConfig);
      
      import('firebase/auth').then((authModule) => {
        const { getAuth } = authModule;
        authInstance = getAuth(app);
      });
      
      import('firebase/firestore').then((firestoreModule) => {
        const { getFirestore } = firestoreModule;
        dbInstance = getFirestore(app);
      });
      
      import('firebase/storage').then((storageModule) => {
        const { getStorage } = storageModule;
        storageInstance = getStorage(app);
      });
      
      if (firebaseConfig.measurementId) {
        import('firebase/analytics').then((analyticsModule) => {
          const { getAnalytics } = analyticsModule;
          getAnalytics(app);
        });
      }
    }
  });
}

// Export services - will be null during SSR/prerendering
export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
export default app;