// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAWI_JUBwT51ZzFpJnJpt6JU6BbGUC8mc",
  authDomain: "kaustubh-c70b0.firebaseapp.com",
  projectId: "kaustubh-c70b0",
  storageBucket: "kaustubh-c70b0.appspot.com",
  messagingSenderId: "203431264462",
  appId: "1:203431264462:web:301b97879fca1fee8c109f",
  measurementId: "G-6DDQ7GLLRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app.firestore();
