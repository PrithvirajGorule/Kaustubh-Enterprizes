import React, { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { Link } from "react-router-dom";

import './../CSS/Comman.css';
import logo from'./../Assects/logo.jpeg';

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

      // Redirect the user to dashboard after successful login
      navigationRef.current?.click(); // Trigger the click event to navigate

      // Save user ID to localStorage or wherever needed
      localStorage.setItem("userId", user.uid);
      console.log("User logged in successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
        <img className="login_img" src={logo}></img>
        
          <form className="login" onSubmit={handleLogin}>
            <div className="login__field">
            
              <input
                type="text"
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
              <span className="button__text">Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <br></br>
            <br></br>
            <a>forgot password ? </a> or <a href="/register">register</a>
            
            {error && <p className="error-message">{error}</p>}
          </form>
       
          {/* Link to dashboard */}
          <Link to="/admindashboard" style={{ display: "none" }} ref={navigationRef} />
        </div>
        {/* <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div> */}
      </div>
    </div>
  );
}

export default LoginForm;
