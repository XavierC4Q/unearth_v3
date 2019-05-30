import gql from 'graphql-tag';

export default gql`
	query currentUser {
		currentUser @client {
			user {
				username
				email
				account
				joined
				id
			}
		}
	}
`;
