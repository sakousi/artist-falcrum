const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        currentUser: User

        user(id: Int!): User
        users: [User!]!
        getUser(name: String!): User
    }

    type Mutation {
        logout: Boolean
    }

    type User {
        id: Int!
        username: String!
        email: String!
        phone: String!
        firstname: String!
        lastname: String!
        password: String!
        posts: [Post!]!
        comments: [Comment!]!
        likes: [Like!]!
        categories: [Category!]!
        userBadges: [UserBadge!]!
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        media: String!
        createdAt: String!
        likes: [Like!]!
    }

    type Comment {
        id: Int!
        content: String!
        createdAt: String!
        likes: [Like!]!
    }

    type Like {
        id: Int!
        user: User!
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


`;

module.exports = typeDefs;