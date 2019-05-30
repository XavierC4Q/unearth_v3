const User = require('../../models/user');

const UserResolver = {
	Query: {
		singleUser: async function(parent, { id }, context) {
			try {
				const user = await User.findById(id);
				return {
					id: user._doc._id,
					username: user._doc.username,
					email: user._doc.email,
					account: user._doc.account,
					joined: user._doc.joined,
				};
			} catch (err) {
				return null;
			}
		},
	},
};

module.exports = UserResolver;
