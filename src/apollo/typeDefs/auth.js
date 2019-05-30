const { gql } = require('apollo-server-express');

const AuthTypeDefs = gql`
    type Auth implements Node {
        id: ID!
        user: User!
        token: String!
        message: String
    }

    extend type Query {
        isAuthenticated: Node
    }

    extend type Mutation {
        login(email: String!, password: String!): Node
        register(username: String!, password: String!, email: String!): Node
    }
`;

module.exports = AuthTypeDefs;