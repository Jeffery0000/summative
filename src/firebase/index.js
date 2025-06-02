// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBywFp81wBX1bBA3LLFbwvzW6QpqOQla2k",
    authDomain: "ics4u-5821e.firebaseapp.com",
    projectId: "ics4u-5821e",
    storageBucket: "ics4u-5821e.firebasestorage.app",
    messagingSenderId: "189095319392",
    appId: "1:189095319392:web:fcb68f5bdd3323ce49f005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// IMPORTANT: Set persistence immediately - this ensures login state persists across refreshes
// Using browserLocalPersistence to maintain login across browser sessions
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting auth persistence:", error);
    });

// Enable offline persistence for Firestore data
enableIndexedDbPersistence(firestore)
    .catch((error) => {
        if (error.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a time
            console.error("Firestore persistence failed: Multiple tabs open");
        } else if (error.code === 'unimplemented') {
            // The current browser does not support persistence
            console.error("Firestore persistence is not supported by this browser");
        } else {
            console.error("Error enabling Firestore persistence:", error);
        }
    });

export { app, auth, firestore, googleProvider };