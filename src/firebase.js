// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQkDWOC3mWY1egubJVzyb_b3MRCz3RDWs",
  authDomain: "easyhome-c6270.firebaseapp.com",
  projectId: "easyhome-c6270",
  storageBucket: "easyhome-c6270.firebasestorage.app",
  messagingSenderId: "605471664353",
  appId: "1:605471664353:web:871bdaf546821b19592fa0",
  measurementId: "G-WMZYS1WFH5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
