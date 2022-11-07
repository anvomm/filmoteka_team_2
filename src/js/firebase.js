// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPwQhZhan68kzz8EBW2eMxBtmy4kRT4UY",
  authDomain: "flmteka.firebaseapp.com",
  projectId: "flmteka",
  storageBucket: "flmteka.appspot.com",
  messagingSenderId: "76802850536",
  appId: "1:76802850536:web:0a73e5139167250614135d",
  measurementId: "G-5JJJQV8D4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

