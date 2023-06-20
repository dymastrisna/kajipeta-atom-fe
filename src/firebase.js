// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-MO0MyUU409xa84tkDQMBcOLH4xMqScI",
  authDomain: "react-app-814cf.firebaseapp.com",
  projectId: "react-app-814cf",
  storageBucket: "react-app-814cf.appspot.com",
  messagingSenderId: "647550529799",
  appId: "1:647550529799:web:33c40bdd9505ba0ce855a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
