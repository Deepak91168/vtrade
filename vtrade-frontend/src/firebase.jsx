// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vrade-1.firebaseapp.com",
  projectId: "vrade-1",
  storageBucket: "vrade-1.appspot.com",
  messagingSenderId: "627693160833",
  appId: "1:627693160833:web:c67246d90ef7dab5400080"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);