export default `
    enum Account {
        GUEST,
        ADMIN,
        ARTIST
    }

    type Cred {
        email: String!
        password: String!
    }

    type RegisterCred extends Cred {
        username: String!
    }

    type User {
        username: String!
        email: String!
        joined: Date!
        account: Account
        id: ID!
    }

    extend type Query {
        currentUser: User
    }
`;
