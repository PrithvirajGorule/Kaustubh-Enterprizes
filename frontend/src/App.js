import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Header";
import Homepage from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import ProductList from "./Components2/ProductList";
import Footer from "./Components/Footer";
import AddCustomer from "./Components2/SendOrder";
import AddProductForm from "./Components2/add-products";
import OrderDetail from "./Components2/OrderDetail";
import Invoice from "./Components2/Invoice";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      {/* <Slider></Slider> */}
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/Contact-us" element={<ContactUs />} />
          <Route path="/About" element={<About />} />
          <Route path="/sendquotation" element={<AddCustomer></AddCustomer>} />
        <Route path="/addproduct" element={<AddProductForm></AddProductForm>} />
        <Route path="/orderlist" element={<ProductList></ProductList>} />
        <Route path="/orders/:id" element={<OrderDetail></OrderDetail>} />
        <Route path="/invoice/:id" element={<Invoice></Invoice>} />
        <Route path="/login" element={<Login></Login>} />
        <Route  path="/register" element={<Register></Register>} />
        </Routes>
        
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
