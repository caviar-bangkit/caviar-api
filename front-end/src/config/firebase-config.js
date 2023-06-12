import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo5UlNKnzliODSIcvzdow_1TjNNvWj-eE",
  authDomain: "caviar-apps-da02b.firebaseapp.com",
  projectId: "caviar-apps-da02b",
  storageBucket: "caviar-apps-da02b.appspot.com",
  messagingSenderId: "122670404265",
  appId: "1:122670404265:web:05bde28c648418eae4cfb8",
  measurementId: "G-T7LE18EEY8"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auths = firebase.auth();

export { auths, db };

