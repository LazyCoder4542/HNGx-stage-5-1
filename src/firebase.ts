// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfpuywzn8XHMKQPtH0Njx_nXtsZ3yU0_o",
  authDomain: "help-me-out-c531f.firebaseapp.com",
  projectId: "help-me-out-c531f",
  storageBucket: "help-me-out-c531f.appspot.com",
  messagingSenderId: "832104186233",
  appId: "1:832104186233:web:60844c1cc3b03dc23e2fa8",
  measurementId: "G-VRSPJHYG0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);