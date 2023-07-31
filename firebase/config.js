import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgJ0Ad1Djh4p_l8XpFzlnuKIt2qkn5o4E",
    authDomain: "reactnativehomework.firebaseapp.com",
    databaseURL: "https://reactnativehomework-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "reactnativehomework",
    storageBucket: "reactnativehomework.appspot.com",
    messagingSenderId: "792422131881",
    appId: "1:792422131881:web:724540616a8e898ff7e1b8",
    measurementId: "G-YFED7C7GNS"
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
export const fireStore = getFirestore(db);