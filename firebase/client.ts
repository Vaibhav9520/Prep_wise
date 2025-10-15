// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSpXrVRi273oQcgdQuQmEw2QtMGNPj0JQ",
  authDomain: "prepwise-519fd.firebaseapp.com",
  projectId: "prepwise-519fd",
  storageBucket: "prepwise-519fd.firebasestorage.app",
  messagingSenderId: "978578062956",
  appId: "1:978578062956:web:6c441d1670701316366249",
  measurementId: "G-6V5D0TDRF6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);




