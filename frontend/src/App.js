import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Product from "./Pages/Product";
import HardnessConverter from "./Pages/Calculator";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AdminDashboard from "./Components2/AdminDashboard";
import AdminProductOperations from "./Components2/AdminProductOprations";
import AddCustomer from "./Components2/SendOrder";
import QuotationList from "./Components2/QuotationList";
import OrderDetail from "./Components2/OrderDetail";
import Invoice from "./Components2/Invoice";
import ProtectedRoute from "./Sequrity/ProtectedRoute";
import useActivityListener from "./Sequrity/useActivityListener";
function App() {
  useActivityListener(); // Initialize activity listener

  return (
    <div>
      <Navbar />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Contact-us" element={<ContactUs />} />
            <Route path="/About" element={<About />} />
            <Route path="/Products" element={<Product />} />
            <Route path="/calculator" element={<HardnessConverter />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Login />} />
            {/* <Route path="/admindashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } /> */}
            <Route path="/admindashboard" element={
              <ProtectedRoute>
                <AdminProductOperations />
              </ProtectedRoute>
            } />
            <Route path="/sendquotation" element={
             
                <AddCustomer />
            
            } />
            <Route path="/orderlist" element={
              <ProtectedRoute>
                <QuotationList />
              </ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } />
            <Route path="/invoice/:id" element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
