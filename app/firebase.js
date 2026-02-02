// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANmHZye350KpQsDEdmtlgfEe0oQirCNw8",
    authDomain: "password-manager-a506e.firebaseapp.com",
    projectId: "password-manager-a506e",
    storageBucket: "password-manager-a506e.firebasestorage.app",
    messagingSenderId: "1019758879046",
    appId: "1:1019758879046:web:a7cd4c0b47985cdfe00547",
    measurementId: "G-5VPX4WCPTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);