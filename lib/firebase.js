// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwWqz3gZE0xY_lP44ERrdfi3eaG2peZIs",
  authDomain: "tili-88ab1.firebaseapp.com",
  projectId: "tili-88ab1",
  storageBucket: "tili-88ab1.firebasestorage.app",
  messagingSenderId: "409083918496",
  appId: "1:409083918496:web:35a9f8fbbfa16aa038b1c5",
  measurementId: "G-7SLD09LRPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };

export default app;