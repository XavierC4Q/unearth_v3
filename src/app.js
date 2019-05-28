const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./apollo/schema');
const cors = require('cors');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(logger('dev'));

app.use('/graphql', function(req, res, next) {
	const token = req.headers.authorization || '';
	if (token) {
		try {
			const decoded = jwt.verify(token, 'MARKBEAU');
			const decode = decoded._doc;
			req.user = {
				username: decode.username,
				email: decode.email,
				account: decode.account,
				joined: decode.joined,
			};
			next();
		} catch (err) {
			res.status(304).json({ error: 'Error verifying token' });
		}
	} else {
		next();
	}
});

const apolloServer = new ApolloServer({
	schema,
	context: ({ req }) => ({
		user: req.user,
	}),
});

apolloServer.applyMiddleware({ app });

app.listen(4000, function() {
	console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});
