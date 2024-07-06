import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userId'); // Check if user is authenticated
  const lastActivity = localStorage.getItem('lastActivity'); // Get last activity timestamp
  const currentTime = new Date().getTime();

  if (isAuthenticated && lastActivity && (currentTime - lastActivity < 3600000)) {
    localStorage.setItem('lastActivity', currentTime); // Update last activity timestamp
    return children;
  } else {
    localStorage.removeItem('userId'); // Clear the auth token
    localStorage.removeItem('lastActivity'); // Clear the last activity timestamp
    return <Navigate to="/admin" />;
  }
};

export default ProtectedRoute;
