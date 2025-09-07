
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

let app: FirebaseApp;

if (getApps().length === 0) {
    if (Object.values(firebaseConfig).every(Boolean)) {
        app = initializeApp(firebaseConfig);
    } else {
        console.error("Firebase config is missing or incomplete. Check your environment variables.");
        // Throw an error during build/server-side execution if config is missing
        if (typeof window === 'undefined') {
            throw new Error("Server-side Firebase initialization failed due to missing environment variables.");
        }
    }
} else {
    app = getApp();
}

const db: Firestore = getFirestore(app);

export { db, app };
