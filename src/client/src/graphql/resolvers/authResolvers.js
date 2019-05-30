export default {
	Mutation: {
		setCurrentUser(_, { user, token }, { cache }) {
			console.log('THE RESOLVER?', user, token);
			if (token && user) {
				localStorage.setItem('auth-token', token);

				const data = {
					currentUser: {
						user,
						__typename: 'Auth',
					},
				};

				cache.writeData({ data });
			}
		},
		logout(_, args, { cache }) {
			localStorage.removeItem('auth-token');

			const data = {
				currentUser: {
					user: null,
					__typename: 'Auth',
				},
			};

			cache.writeData({ data });
		},
	},
};
