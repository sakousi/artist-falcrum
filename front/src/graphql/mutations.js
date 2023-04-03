import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation register($pseudo: String!, $firstname: String, $lastname: String, $phone: String ,$email: String!, $password: String!) {
        createUser(pseudo: $pseudo, firstname: $firstname, lastname: $lastname, phone: $phone, email: $email, password: $password) {
            pseudo
            firstname
            lastname
            phone
            email
            password
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            id
            password
        }
    }
`;

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`;