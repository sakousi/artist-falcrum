import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import Logout from "./router/Logout";
import Profil from "./router/Profil";
import Register from "./router/Register";

class App extends React.Component {
  render() {
    const connected = localStorage.getItem("isConnected");
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profil" element={connected?<Profil/>:<Navigate to="/login"/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App