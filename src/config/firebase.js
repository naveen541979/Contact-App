import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC012S51Sbxx4-FECo9H7rVF-RrcGtNZGA",
    authDomain: "vite-contact-fb03e.firebaseapp.com",
    projectId: "vite-contact-fb03e",
    storageBucket: "vite-contact-fb03e.firebasestorage.app",
    messagingSenderId: "722635981187",
    appId: "1:722635981187:web:248496325bc6a24625f6b6"
};

export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
   