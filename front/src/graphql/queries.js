import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
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