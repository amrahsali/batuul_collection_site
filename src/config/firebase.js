import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for project: batuul-collection
const firebaseConfig = {
  apiKey: "AIzaSyBKeahJ4W4Rijko3Wl4We2QAI2ofw6tZmk",
  authDomain: "batuul-collection.firebaseapp.com",
  projectId: "batuul-collection",
  storageBucket: "batuul-collection.firebasestorage.app",
  messagingSenderId: "375910441180",
  appId: "1:375910441180:web:a7578041bcda94c65c5419",
  measurementId: "G-YGY09ECY7T"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export default app;
