
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Ensure all config values are present before initializing
const isConfigValid = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp;
let db: Firestore;

if (isConfigValid) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    // In a server environment, re-throwing makes the build/render fail clearly.
    if (typeof window === 'undefined') {
      throw new Error("Server-side Firebase initialization failed.");
    }
  }
} else {
  console.error("Firebase config is missing or incomplete. Check your environment variables.");
  if (typeof window === 'undefined') {
    throw new Error("Server-side Firebase initialization failed due to missing environment variables.");
  }
}


// @ts-ignore - db and app will be initialized if config is valid, otherwise it will throw.
export { db, app };
