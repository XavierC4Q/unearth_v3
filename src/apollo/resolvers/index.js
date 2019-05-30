const AuthResolver = require('./auth');
const UserResolver = require('./user');

const RootResolver = {
    Node: {
        __resolveType(obj, context) {
            if (obj.username && obj.account) {
                return 'User';
            }
            if (obj.token && obj.user) {
                return 'Auth';
            }
            return null;
        }
    }
};

module.exports = [
    RootResolver,
    AuthResolver,
    UserResolver,
];