import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

import './../CSS/Comman.css';
import logo from './../Assects/logo.jpeg';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle between login and forgot password forms
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      const user = userCredential.user;

      localStorage.setItem("userId", user.uid);
      localStorage.setItem("lastActivity", new Date().getTime());
      console.log("User logged in successfully");

      navigate("/admindashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(getAuth(), email);
      setMessage("Password reset email sent successfully.");
      setError(null);
    } catch (error) {
      setError(error.message);
      setMessage(null);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <img className="login_img" src={logo} alt="Logo" />
          {isForgotPassword ? (
            <form className="login" onSubmit={handlePasswordReset}>
              <div className="login__field">
                <input
                  type="email"
                  className="login__input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login__submit">
                <span className="button__text">Reset Password</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <br />
              <br />
              <a href="#" onClick={() => setIsForgotPassword(false)}>Back to Login</a>
              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
            </form>
          ) : (
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
              <br />
              <br />
              <a href="#" onClick={() => setIsForgotPassword(true)}>Forgot password?</a> 
              {error && <p className="error-message">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
