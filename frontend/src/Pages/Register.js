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
