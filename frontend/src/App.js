import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from "./Components/Header";
import Homepage from "./Pages/Home";

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

        </Routes>
    </Router>


    </div>
  );
}

export default App;
