// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlqMxJ9yZQMuIacYOcrjnvT2ZSo-wyor4",
  authDomain: "seeker-216a3.firebaseapp.com",
  projectId: "seeker-216a3",
  storageBucket: "seeker-216a3.appspot.com",
  messagingSenderId: "958824268656",
  appId: "1:958824268656:web:279f1061b646b7742385b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};
