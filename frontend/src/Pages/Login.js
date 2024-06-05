import React, { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { Link } from "react-router-dom";
import { faInstagram,faLinkedin,faFacebook } from '@fortawesome/free-brands-svg-icons'; // Import the Instagram icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './../CSS/login.css';

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
        <h2 className="sign-in-heading">Sign In</h2>
          <form className="login" onSubmit={handleLogin}>
            <div className="login__field">
              {/* <i className="login__icon fas fa-user"></i> */}
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
              {/* <i className="login__icon fas fa-lock"></i> */}
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
              <span className="button__text">Log In Now</span>
              {/* <i className="button__icon fas fa-chevron-right"></i> */}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          {/* <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
            <a href="https://www.instagram.com/vasubiradar" className="footer__icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://in.linkedin.com/company/kaustubh-enterprises" className="footer__icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="footer__icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            </div>
          </div> */}
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
