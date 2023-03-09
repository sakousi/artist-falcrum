

const resolvers = {
    Query: {
        currentUser: (parent, args, context) => context.getUser(),
        async user(root, { id }, { models }) {
            return await models.User.findByPk(id);
        },
        async users(root, args, { models }) {
            return await models.User.findAll();
        },
        async getUser(root, { name }, { models }) {
            return await models.User.findOne({ where: { username: name } });
        },
    },

    User: {
        async posts(user) {
            return await user.getPosts();
        },
        async comments(user) {
            return await user.getComments();
        },
        async likes(user) {
            return await user.getLikes();
        }


    },
};

module.exports = resolvers