const UserResolver = {
    Query: {
        singleUser: function(parent, args, context) {
            return {
                username: 'Pratel Mizor',
                account: 'GUEST',
                joined: '1289484983',
                homeCoordinates: '60 45',
            };
        }
    }
};

module.exports = UserResolver;