// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Import the Firebase configuration from api.js
import firebaseConfig from './api';



// Initialize Firebase
const app = initializeApp(firebaseConfig); // using this as a variable for secuirty 
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
