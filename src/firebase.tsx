import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsQse1mKxQ1F7-l41RE1Oz4QhP91qgmLw",
  authDomain: "clubbox-system.firebaseapp.com",
  projectId: "clubbox-system",
  storageBucket: "clubbox-system.appspot.com",
  messagingSenderId: "359955007424",
  appId: "1:359955007424:web:67ba150aad7d439d6eea25",
  measurementId: "G-D9WWVVXX7W",
};
/*
const firebaseConfig = {
  apiKey: "AIzaSyAfhFicBJ95gVLa4QQTuPOrLOVgJi_ikzU",
  authDomain: "clubbox-1f192.firebaseapp.com",
  projectId: "clubbox-1f192",
  storageBucket: "clubbox-1f192.appspot.com",
  messagingSenderId: "407119862323",
  appId: "1:407119862323:web:58d60ba109f709cd656146",
  measurementId: "G-3KCWELCGJ6"
};
*/

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
