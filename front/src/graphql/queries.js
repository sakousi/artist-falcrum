import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
            password
        }
    }
`;

export const POSTS = gql`
    query getPosts {
        getPosts {
            id
            title
            content
            media
            createdAt
            likes {
                id
                createdAt
            }
        }
    }
`;