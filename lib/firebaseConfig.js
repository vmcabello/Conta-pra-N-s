// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALjYvH5uNdYj5os2cn_00ELR2MbZ1IFhU",
  authDomain: "conta-pra-nos.firebaseapp.com",
  projectId: "conta-pra-nos",
  storageBucket: "conta-pra-nos.appspot.com",
  messagingSenderId: "269908127558",
  appId: "1:269908127558:web:23d2c3c6f50ffab923ff47",
  measurementId: "G-V00TEW33SE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();