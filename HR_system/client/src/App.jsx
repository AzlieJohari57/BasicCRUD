import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Project from "./components/Project";
import Test from "./components/Test";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
