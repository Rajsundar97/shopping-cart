// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD53m3q8FOVR05DUb0jCsJfaE7vloL_9Q",
    authDomain: "instagram-clone-5abee.firebaseapp.com",
    projectId: "instagram-clone-5abee",
    storageBucket: "instagram-clone-5abee.appspot.com",
    messagingSenderId: "219132106935",
    appId: "1:219132106935:web:b83769d54555c9c8e4d532",
    measurementId: "G-3DHK0RBJXF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
