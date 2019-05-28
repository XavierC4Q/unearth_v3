const { gql } = require('apollo-server-express');

const AuthTypeDefs = gql`
    type Auth {
        user: User!
        token: String!
        message: String
    }

    extend type Query {
        isAuthenticated: User
    }

    extend type Mutation {
        login(email: String!, password: String!): Auth
        register(username: String!, password: String!, email: String!): Auth
    }
`;

module.exports = AuthTypeDefs;