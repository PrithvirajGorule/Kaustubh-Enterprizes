import React from 'react';
import { Link } from 'react-router-dom';
import './../CSS/AdminDashboard.css'
 // Import the CSS file


function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <Link to="/adminproductList" className="admin-dashboard-link">Admin Product Dashboard</Link>
      <Link to="/orderlist" className="admin-dashboard-link">Order List</Link>
    </div>
  );
}

export default AdminDashboard;
