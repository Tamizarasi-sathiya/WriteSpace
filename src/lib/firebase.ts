
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for missing environment variables and provide a more specific error.
if (!firebaseConfig.projectId) {
  throw new Error("Firebase Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not defined. Please check your Vercel environment variables.");
}
if (!firebaseConfig.apiKey) {
    throw new Error("Firebase Error: NEXT_PUBLIC_FIREBASE_API_KEY is not defined. Please check your Vercel environment variables.");
}


let app: FirebaseApp;
let db: Firestore;

try {
  // Initialize Firebase
  // This pattern prevents re-initializing the app on hot reloads.
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Re-throw the error to ensure the server fails loudly instead of silently.
  throw new Error("Failed to initialize Firebase. Please check your configuration and credentials.");
}

export { db, app };
