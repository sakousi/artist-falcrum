import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import Logout from "./router/Logout";
import Register from "./router/Register";
import Post from "./router/Post";
import CurrentProfil from "./router/CurrentProfil";
import Profil from "./router/Profil";
import NotFound from "./router/NotFound";
import CreatePost from "./router/CreatePost";
import PageLoader from "./router/PageLoader";
import Navigation from "./router/component/Navigation";
import Footer from "./router/component/Footer";
import { Box } from "@chakra-ui/react";

class App extends React.Component {
  render() {
    const connected = localStorage.getItem("isConnected");
    return (
      <BrowserRouter>
        <Box minH={"100vh"} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/post/:postId" element={<Post/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profil" element={connected?<CurrentProfil/>:<Navigate to="/login"/>} />
            <Route path="/profil/:userId" element={<Profil/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/newpost" element={<CreatePost/>} />
            <Route path="/loader" element={<PageLoader/>} />

            <Route path="*" element={<NotFound/>} />
          </Routes>
          <Footer />
        </Box>
      </BrowserRouter>
    );
  }
}

export default App