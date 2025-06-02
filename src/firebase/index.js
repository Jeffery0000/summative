// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

export { auth, firestore };