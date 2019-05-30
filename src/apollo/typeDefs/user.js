const { gql } = require('apollo-server-express');

const UserTypeDef = gql`
    type User implements Node {
        id: ID!
        username: String!
        email: String!
        account: Account
        joined: String!
    }

    extend type Query {
        singleUser(id: ID!): Node
    }
`;

module.exports = UserTypeDef;