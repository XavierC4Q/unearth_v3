const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthResolvers = {
	Query: {
		isAuthenticated: function(parent, args, context) {
			if (context.user) {
				return context.user;
			}
			return null;
		},
	},
	Mutation: {
		login: async function(parent, { email, password }) {
			try {
				const findUser = await User.findOne({ email });
				const validPassword = bcrypt.compareSync(password, findUser.password);

				if (validPassword) {
					const token = jwt.sign(
						{
							username: findUser.username,
							email: findUser.email,
							joined: findUser.joined,
							account: findUser.account,
						},
						'MARKBEAU',
						{ expiresIn: '12h' },
					);
					return { user: findUser, token, message: 'Login success!' };
				}
				else {
					return { user: null, token: '', message: 'WRONG PASSWORD/EMAIL' };
				}
			} catch (error) {
				return null;
			}
		},
		register: async function(parent, { username, email, password }) {
			try {
				await User.create({ username, email, password });
				const newUser = await User.findOne({ email });

				const token = jwt.sign(
					{
						username: newUser.username,
						email: newUser.email,
						joined: newUser.joined,
						account: newUser.account,
					},
					'MARKBEAU',
					{ expiresIn: '12h' },
				);

				return { user: newUser, token, message: 'Register success!' };
			} catch (error) {
				return { user: null, token: '', message: 'Failed to register' };
			}
		},
	},
};

module.exports = AuthResolvers;
