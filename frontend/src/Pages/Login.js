// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import React, { useState ,useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { redirectDocument } from "react-router-dom";
import "../CSS/Home.css";
// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAWI_JUBwT51ZzFpJnJpt6JU6BbGUC8mc",
  authDomain: "kaustubh-c70b0.firebaseapp.com",
  projectId: "kaustubh-c70b0",
  storageBucket: "kaustubh-c70b0.appspot.com",
  messagingSenderId: "203431264462",
  appId: "1:203431264462:web:301b97879fca1fee8c109f",
  measurementId: "G-6DDQ7GLLRC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigationRef = useRef(null); // Ref for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const user = userCredential.user;

      // Redirect the user to another page
      navigationRef.current?.click(); // Trigger the click event to navigate

      // Save user ID to localStorage or wherever needed
      localStorage.setItem("userId", user.uid);
      console.log("User logged in successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <Link to="/admindashboard" style={{ display: "none" }} ref={navigationRef} />
    </div>
  );
}

export default LoginForm;