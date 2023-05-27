import React from "react";
import { Routes, Route } from "react-router";
import About from "../About/About";
import Home from "../Home/Home";
import Contact from "../Contact/Contact";

import './body.css';

const Body = ()=>{
    return (
      <div className="body-div">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    );
}

export default Body;