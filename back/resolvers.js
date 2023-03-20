const argon2 = require("argon2");

async function generateSalt() {
    const salt = await argon2.generateSalt();
    return salt;
}


const resolvers = {
    Query: {
        currentUser: (parent, args, context) => {context.getUser()},

        async user(root, { id }, { models }) {
            return await models.User.findByPk(id);
        },
        async users(root, args, { models }) {
            return await models.User.findAll();
        },
        async getUser(root, { name }, { models }) {
            return await models.User.findOne({ where: { username: name } });
        },
        
        getPosts: async (parent, args, { models }) => {
            return await models.Post.findAll();
        },
    },


    Mutation: {

        async createUser(root, { pseudo, email, password }, { models }) {
            return argon2.hash(password).then(hash => {
                return models.User.create({
                    pseudo,
                    email,
                    password: hash,
                });
            });
        },
        async updateUser(root, { id, pseudo, email, password }, { models }) {
            return await models.User.update(
                {
                    pseudo,
                    email,
                    password,
                },
                {
                    where: {
                        id,
                    },
                }
            );
        },
        async deleteUser(root, { id }, { models }) {
            return await models.User.destroy({
                where: {
                    id,
                },
            });
        },

        async createPost(root, { title, content, userId }, { models }) {
            return await models.Post.create({
                title,
                content,
                userId,
            });
        },
        async updatePost(root, { id, title, content, userId }, { models }) {
            return await models.Post.update(
                {
                    title,
                    content,
                    userId,
                },
                {
                    where: {
                        id,
                    },
                }
            );
        },
        async deletePost(root, { id }, { models }) {
            return await models.Post.destroy({
                where: {
                    id,
                },
            });
        },

        async createComment(root, { content, userId, postId }, { models }) {
            return await models.Comment.create({
                content,
                userId,
                postId,
            });
        },
        async updateComment(root, { id, content, userId, postId }, { models }) {
            return await models.Comment.update(
                {
                    content,
                    userId,
                    postId,
                },
                {
                    where: {
                        id,
                    },
                }
            );
        },
        async deleteComment(root, { id }, { models }) {
            return await models.Comment.destroy({
                where: {
                    id,
                },
            });
        },

        async login(root, { email, password }, context) {
            const { user } = await context.authenticate('graphql-local', {email, password});
            console.log(user);
            context.login(user);
            return { user };
        },
        async logout(parent, args, context) {
            context.logout();
            return true;
        }
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