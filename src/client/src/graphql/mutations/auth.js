import gql from 'graphql-tag';

export const login = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            ... on Auth {
                token,
                user {
                    username,
                    email,
                    joined,
                    account,
                    id
                }
            }
        }
    }
`;

export const register = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            id
            ... on Auth {
                token,
                user {
                    username,
                    email,
                    joined,
                    account,
                    id
                }
            }
        }
    }
`;
