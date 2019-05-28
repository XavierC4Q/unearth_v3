const { makeExecutableSchema } = require('apollo-server-express');
const TypeDefs = require('./typeDefs/index');
const Resolvers = require('./resolvers/index');

const schema = makeExecutableSchema({
	typeDefs: TypeDefs,
	resolvers: Resolvers,
	logger: {
		log: function(err) {
			console.log(`GRAPHQL Error ${err}`);
		},
	},
});

module.exports = schema;
