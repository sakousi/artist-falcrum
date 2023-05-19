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

export const USER = gql`
    query getUser($id: Int!) {
        getUser(id: $id) {
            id
            pseudo
            image
            firstname
            lastname
            email
            posts {
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
            comments {
                id
                content
                createdAt
                likes {
                    id
                    createdAt
                }
            }
            likes {
                id
                createdAt
            }
            categories {
                id
                name
            }
            userBadges {
                id
                createdAt
                badge {
                    id
                    name
                }
            }
        }
    }
`;

export const USERS = gql`
    query getUsers($pseudo: String) {
        getUsersByName(pseudo: $pseudo) {
            id
            pseudo
            image
            firstname
            lastname
            email
        }
    }
`;

export const POST = gql`
    query getPost($id: Int!) {
        getPost(id: $id) {
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

export const POSTS = gql`
    query getPosts {
        getPosts {
            id
            title
            content
            media
            user {
                id
                pseudo
                image
            }
            createdAt
            likes {
                id
                user{
                    id
                }
                createdAt
            }
        }
    }
`;

export const GET_LIKES = gql`
    query getLikes($postId: Int, $commentId: Int) {
        getLikes(postId: $postId, commentId: $commentId) {
            id
            user{
                id
            }
            createdAt
        }
    }
`;

export const COMMENTS = gql`
    query getComments($postId: Int!) {
        getComments(postId: $postId) {
            id
            content
            createdAt
            likes {
                id
                createdAt
            }
        }
    }
`;