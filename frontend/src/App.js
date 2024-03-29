import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Header";
import Homepage from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import QuotationList from "./Components2/QuotationList";
import Footer from "./Components/Footer";
import AddCustomer from "./Components2/SendOrder";
import AddProductForm from "./Components2/AddNewrProducts";
import OrderDetail from "./Components2/OrderDetail";
import Invoice from "./Components2/Invoice";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminProductOprations from "./Components2/AdminProductOprations";
import AdminDashboard from "./Components2/AdminDashboard";
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
          {/* create admin */}
          <Route path="/register" element={<Register></Register>} />
          {/* login admin */}
          <Route path="/login" element={<Login></Login>} />
          {/* admin dashboard  */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          {/* product related oprations  */}
          <Route
            path="/adminproductList"
            element={<AdminProductOprations></AdminProductOprations>}
          />
          {/* new quotation */}
          <Route path="/sendquotation" element={<AddCustomer></AddCustomer>} />
          {/* <Route path="/addproduct" element={<AddProductForm></AddProductForm>} /> */}
          {/* see new quotations  */}
          <Route path="/orderlist" element={<QuotationList></QuotationList>} />
          <Route path="/orders/:id" element={<OrderDetail></OrderDetail>} />
          {/* invoice */}
          <Route path="/invoice/:id" element={<Invoice></Invoice>} />\
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
