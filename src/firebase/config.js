// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAht0Qq5LcUiW8fFd5ZjngGOLNf5V9uW1c',
    authDomain: 'cantinhcmus-20630.firebaseapp.com',
    projectId: 'cantinhcmus-20630',
    storageBucket: 'cantinhcmus-20630.appspot.com',
    messagingSenderId: '723979247236',
    appId: '1:723979247236:web:ad52aa8109c33c6a2e2cd1',
    measurementId: 'G-9FHXFS28BY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, auth, storage };
