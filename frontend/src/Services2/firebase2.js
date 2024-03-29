import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAWI_JUBwT51ZzFpJnJpt6JU6BbGUC8mc",
  authDomain: "kaustubh-c70b0.firebaseapp.com",
  projectId: "kaustubh-c70b0",
  storageBucket: "kaustubh-c70b0.appspot.com",
  messagingSenderId: "203431264462",
  appId: "1:203431264462:web:301b97879fca1fee8c109f",
  measurementId: "G-6DDQ7GLLRC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default firebaseApp;
export { auth };
