const { gql } = require('apollo-server-express');
const AuthTypeDefs = require('./auth');
const UserTypeDefs = require('./user');

const RootTypeDefs = gql`
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
