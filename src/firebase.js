// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore}  from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHXY8EuRky51lCrCcp7qvUXpcp-WZkXlk",
  authDomain: "whatsapp-ff836.firebaseapp.com",
  projectId: "whatsapp-ff836",
  storageBucket: "whatsapp-ff836.appspot.com",
  messagingSenderId: "695284877946",
  appId: "1:695284877946:web:edec569201f157e2afc9c3",
  measurementId: "G-07R7JB1HGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider();
const db=getFirestore(app)
export {auth,provider,db}