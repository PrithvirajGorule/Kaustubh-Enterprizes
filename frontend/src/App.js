import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from "./Components/Header";
import Homepage from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";

import Footer from "./Components/Footer";
import About from "./Pages/About";
function App() {
  return (
    <div className="App">
    <Navbar></Navbar>
    {/* <Slider></Slider> */}
    <Router>
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />
          
          <Route
            path="/Contact-us"
            element={<ContactUs />}
          />
 <Route
            path="/About"
            element={<About />}
          />
        </Routes>
       
    </Router>
    <Footer></Footer>


    </div>
  );
}

export default App;
