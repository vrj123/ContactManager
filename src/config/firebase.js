// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-YPbC_DDHepFOVSsEPLPOQdQuwEjR1YQ",
  authDomain: "contact-mangaer.firebaseapp.com",
  projectId: "contact-mangaer",
  storageBucket: "contact-mangaer.appspot.com",
  messagingSenderId: "884120015382",
  appId: "1:884120015382:web:1bfd0d68f1450370e5db37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);