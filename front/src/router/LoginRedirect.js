import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import { CurrentUserContext } from "../CurrentUserContext";
import { Navigate } from "react-router-dom";


export default function LoginRedirect() {
    const {setCurrentUser} = useContext(CurrentUserContext);
    const { data, loading, error } = useQuery(CURRENT_USER);
    if (loading) return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;

    if (data) {
        setCurrentUser(data);
        return <Navigate to="/" />;
    }

    if (!data) {
        return <Navigate to="/login" />;
    }

}