import React from "react";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

function Logout() {
    const [logout] = useMutation(LOGOUT);
    logout();
    localStorage.removeItem("isConnected");
    const navigate = useNavigate()
    navigate("/");
  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

export default Logout;