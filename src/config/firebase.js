import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for project: batuul-collection
const firebaseConfig = {
  apiKey: "AIzaSyBatuulCollectionKey2026Mock",
  authDomain: "batuul-collection.firebaseapp.com",
  projectId: "batuul-collection",
  storageBucket: "batuul-collection.appspot.com",
  messagingSenderId: "375910441180",
  appId: "1:375910441180:web:batuulcollectionapp"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export default app;
