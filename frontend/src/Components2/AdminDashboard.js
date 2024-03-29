import React from 'react';
import { Route, Link } from 'react-router-dom';// Assuming the file name is ProductList.js

function AdminDashboard() {
  return (
    <>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <Link to="/adminproductList">Admin Product Dashboard</Link>
        <br></br>
        <br></br>
        <br></br>
        <Link to="/orderlist">Order List</Link>
      </div>
    
    </>
  );
}

export default AdminDashboard;
