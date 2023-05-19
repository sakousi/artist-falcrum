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

export const CREATE_LIKE = gql`
    mutation createLike($userId: Int!, $postId: Int, $commentId: Int) {
        createLike(userId: $userId, postId: $postId, commentId: $commentId) {
            id
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($content: String!, $userId: Int!, $postId: Int!) {
        createComment(content: $content, userId: $userId, postId: $postId) {
            id
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($title: String!, $content: String!, $media: String!, $userId: Int!) {
        createPost(title: $title, content: $content, media: $media, userId: $userId) {
            id
        }
    }
`;