import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
            pseudo
            image
            firstname
            lastname
            email
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

export const GET_LIKES = gql`
    query getLikes($postId: Int, $commentId: Int) {
        getLikes(postId: $postId, commentId: $commentId) {
            id
            createdAt
        }
    }
`;