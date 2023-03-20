import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import LoginRedirect from "./router/LoginRedirect";
import Register from "./router/Register";


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/redirectLogin" element={<LoginRedirect/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App