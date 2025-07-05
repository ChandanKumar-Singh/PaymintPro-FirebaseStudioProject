import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Function to check if Firebase is configured
export function isFirebaseConfigured() {
    return !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key_here' && !!firebaseConfig.projectId;
}

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (isFirebaseConfigured()) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} else {
    // Provide dummy objects if not configured to avoid further errors
    // at import time. The AuthProvider will handle showing an error message.
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
}


export { app, auth, db };
