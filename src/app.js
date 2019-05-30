const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./apollo/schema');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

mongoose
	.connect('mongodb://localhost:5000/unearth', { useNewUrlParser: true })
	.then(function() {
		console.log('Mongo DB connection established');
	})
	.catch(function(err) {
		console.log('MONGO DB ERR. MUST HAVE MONGOD SERVER RUNNING', err);
	});

app.use(cors());
app.use(logger('dev'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Content-Type', 'application/json');
	next();
});

const verifyJWT = async (req) => {
	const token = req.headers.authorization || '';
	if (token) {
		const user = jwt.verify(token, 'MARKBEAU');
		req.user = { ...user };
		return { user: req.user };
	}

	return {
		user: null,
	};
};

const apolloServer = new ApolloServer({
	schema,
	context: ({ req }) => verifyJWT(req),
});

apolloServer.applyMiddleware({ app });

app.listen(4000, function() {
	console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});
