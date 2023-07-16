const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        currentUser: User

        getUser(id: Int!): User
        getUsers: [User!]!
        getUserByName(pseudo: String!): User
        getUsersByName(pseudo: String): [User]

        getPost(id: Int!): Post!
        getPosts: [Post!]!

        getLikes(postId: Int, commentId: Int): [Like!]!

        getComments(postId: Int!): [Comment!]!
    }

    type Mutation {
        logout: Boolean
        login(email: String!, password: String!): User

        createUser(pseudo: String!, email: String!, phone: String, firstname: String, lastname: String, password: String!): User
        updateUser(id: Int!, pseudo: String!, email: String!, phone: String!, firstname: String!, lastname: String!, password: String!): User
        deleteUser(id: Int!): User

        createPost(title: String!, content: String!, media: String!, userId: Int!): Post
        updatePost(id: Int!, title: String!, content: String!, userId: Int!): Post
        deletePost(id: Int!): Post

        createComment(content: String!, userId: Int!, postId: Int!): Comment
        updateComment(id: Int!, content: String!, userId: Int!, postId: Int!): Comment
        deleteComment(id: Int!): Comment

        createLike(userId: Int!, postId: Int, commentId: Int): Like
        updateLike(id: Int!, userId: Int!, postId: Int, commentId: Int): Like
        deleteLike(id: Int!): Like
    }

    type User {
        id: Int!
        pseudo: String!
        image: String
        email: String!
        phone: String
        firstname: String
        lastname: String
        password: String!
        posts: [Post!]!
        comments: [Comment!]
        likes: [Like!]!
        categories: [Category]
        userBadges: [UserBadge]
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        media: String!
        user: User!
        createdAt: String!
        likes: [Like]
    }

    type Comment {
        id: Int!
        user: User!
        post: Post!
        content: String!
        createdAt: String!
        likes: [Like!]
    }

    type Like {
        id: Int!
        user: User!
        post: Post
        comment: Comment
        createdAt: String!
    }

    type Category {
        id: Int!
        name: String!
    }

    type UserBadge {
        id: Int!
        createdAt: String!
        badge: Badge!
        user: User!
    }

    type Badge {
        id: Int!
        name: String!
    }

    type Session {
        sid : String!
        data : String!
        expires : String!
    }


`;

module.exports = typeDefs;