
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

try {
  if (isConfigValid) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    // Log an error if the config is incomplete. 
    // This helps in debugging Vercel environment variable issues.
    console.error("Firebase config is missing or incomplete. Check your environment variables.");
    // In a server environment, we should throw to fail the build/render
    if (typeof window === 'undefined') {
      throw new Error("Server-side Firebase initialization failed due to missing environment variables.");
    }
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  // Re-throw the error to make it visible in server logs
  if (typeof window === 'undefined') {
    throw error;
  }
}

// @ts-ignore - db and app will be initialized if config is valid
export { db, app };
