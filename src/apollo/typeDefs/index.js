const { gql } = require('apollo-server-express');
const AuthTypeDefs = require('./auth');
const UserTypeDefs = require('./user');

const RootTypeDefs = gql`

	interface Node {
		id: ID!
	}

	enum Account {
		GUEST
		ADMIN
		ARTIST
	}

	type Query {
		_: String
	}

	type Mutation {
		_: String
	}
`;

module.exports = [ RootTypeDefs, AuthTypeDefs, UserTypeDefs ];
