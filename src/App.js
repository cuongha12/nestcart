import React from "react";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Login from "./pages/Login.js";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default App;
