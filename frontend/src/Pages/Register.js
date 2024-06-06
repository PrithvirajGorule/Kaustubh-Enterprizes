// firebaseConfig.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getAuth ,createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"

// Register.js
import React, { useState } from 'react';
import logo from'./../Assects/logo.jpeg';
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
  const [confirmPassword, SetConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password === confirmPassword){
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      // You can redirect the user to another page or perform any other action upon successful registration
    } catch (error) {
      setError(error.message);
    }
  }
  else{
    return
  }
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <img className="login_img" src={logo}></img>
          
          <form className="login" onSubmit={handleRegister}>
            <div className="login__field">
              
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
              
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login__field">
              
              <input
                type="password"
                className="login__input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => SetConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login__submit">
              <span className="button__text">Register</span>
              
            </button>
            <br>
            </br>
            <a href="/login" className="button">

              
            </a>
            <br></br>
            already a user ? <a href='/login'>login</a>
            {error && <p className="error-message">{error}</p>}
          </form>
          
          {/* Link to dashboard */}
        
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
