// firebaseConfig.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getAuth ,createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"

// Register.js
import React, { useState } from 'react';
 // Import the createUserWithEmailAndPassword function from firebase/auth

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-wqG9suUrPXXaZbMmXC5tRsOrwj__7vU",
  authDomain: "kaustubhdev-13dc6.firebaseapp.com",
  projectId: "kaustubhdev-13dc6",
  storageBucket: "kaustubhdev-13dc6.appspot.com",
  messagingSenderId: "228238165299",
  appId: "1:228238165299:web:870f387bf01e6e2bd62a46",
  measurementId: "G-RBDX2GVHKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      // You can redirect the user to another page or perform any other action upon successful registration
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2 className="sign-in-heading">Sign Up</h2>
          <form className="login" onSubmit={handleRegister}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="email"
                className="login__input"
                placeholder="User name / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button login__submit">
              <span className="button__text">Register Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
export default RegistrationForm;
