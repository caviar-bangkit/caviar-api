import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdAU30mG0Gdo0onzoNE4Goo6QHb1LV8DM",
  authDomain: "caviar-bangkit.firebaseapp.com",
  projectId: "caviar-bangkit",
  storageBucket: "caviar-bangkit.appspot.com",
  messagingSenderId: "958128716467",
  appId: "1:958128716467:web:e7efffdedae8524de58ec6",
  measurementId: "G-ZR7XRR8VEW"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };