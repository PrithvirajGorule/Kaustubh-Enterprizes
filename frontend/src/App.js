import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from "./Components/Header";
import Homepage from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";


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

        </Routes>
    </Router>


    </div>
  );
}

export default App;
