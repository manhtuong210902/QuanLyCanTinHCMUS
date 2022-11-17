// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAtSKcKQBgDxl7Q5C7R_Y6q5KpvGyDjR8Y',
    authDomain: 'cantinhcmus.firebaseapp.com',
    projectId: 'cantinhcmus',
    storageBucket: 'cantinhcmus.appspot.com',
    messagingSenderId: '5890835564',
    appId: '1:5890835564:web:c176e860dead57ae9b4449',
    measurementId: 'G-L9N93ENL45',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
