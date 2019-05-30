import AuthTypeDefs from './authTypeDefs';

const RootTypeDefs = `
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }

    type Subscription {
        _: String
    }
`;

export default [ RootTypeDefs, AuthTypeDefs ];
