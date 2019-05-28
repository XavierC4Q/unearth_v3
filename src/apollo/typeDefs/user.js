const { gql } = require('apollo-server-express');

const UserTypeDef = gql`
    type User {
        username: String!
        email: String!
        account: Account
        joined: String!
    }

    extend type Query {
        singleUser(id: Int!): User
    }
`;

module.exports = UserTypeDef;