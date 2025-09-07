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

// Ensure all config values are present
const areConfigValuesPresent = Object.values(firebaseConfig).every(value => !!value);

let app: FirebaseApp;
let db: Firestore;

if (areConfigValuesPresent) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} else {
  console.error("Firebase config is missing or incomplete. Check your environment variables.");
  // Provide dummy instances or handle the error as appropriate for your app
  // This prevents the app from crashing during build if env vars are not set
  app = {} as FirebaseApp;
  db = {} as Firestore;
}


export { db, app };
