import gql from 'graphql-tag';

export default gql`
    query singleUser($id: ID!) {
        singleUser(id: $id) {
            id
            ... on User {
                username,
                email,
                account,
                joined
            }
        }
    }
`;
