const argon2 = require("argon2");
const fs = require("fs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const resolvers = {

    Query: {
        async currentUser(parent, args, {req, res, models}) {
            const token = req.cookies['token']
            console.log(token)
            if (token) {
                const session = await models.Session.findByPk(token);
                if (session) {
                    const user = await models.User.findByPk(jwt.verify(token, process.env.SECRET_KEY).userId);
                    return user;
                }
            }
        },

        async getUser(root, { id }, { models }) {
            return await models.User.findByPk(id);
        },
        async getUsers(root, args, { models }) {
            return await models.User.findAll();
        },
        async getUserByName(root, { name }, { models }) {
            return await models.User.findOne({ where: { pseudo: name } });
        },
        async getUsersByName(root, { pseudo }, { models }) {
            return await models.User.findAll({ where: { pseudo: { [models.Sequelize.Op.substring]: pseudo }}});
        },
        
        async getPosts(parent, args, { models }){
            return await models.Post.findAll();
        },

        async getPost(parent, { id }, { models }){
            return await models.Post.findByPk(id);
        },

        async getLikes (parent, { postId, commentId }, { models }){
            if (postId){
                let likes = await models.Like.findAll({ where: { postId } });
                return likes;
            }
            else if (commentId)
                return await models.Like.findAll({ where: { commentId } });
        },

        async getComments (parent, { postId }, { models }){
            return await models.Comment.findAll({ where: { postId } });
        },
    },


    Mutation: {

        async createUser(root, { pseudo, email, password, firstname, lastname, phone }, { models }) {
            return argon2.hash(password).then(hash => {
                return models.User.create({
                    pseudo,
                    email,
                    password: hash,
                    firstname,
                    lastname,
                    phone,
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

        async createPost(root, { title, content, media, userId }, { models }) {
            return await models.Post.create({
              title,
              content,
              media,
              userId,
            });
        },
        async updatePost(root, { id, title, content, media, userId }, { models }) {
            return await models.Post.update(
                {
                    title,
                    content,
                    media,
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

        async createLike(root, { userId, postId, commentId }, { models }) {
            return await models.Like.create({
                UserId: userId,
                PostId: postId,
                CommentId: commentId,
            });
        },

        async login(root, { email, password }, context) {
            let user = await context.models.User.findOne({ where: { email } });
            if (!user) {
                throw new Error("No user with that email");
            }
            let valid = await argon2.verify(user.password, password);
            if (!valid) {
                throw new Error("Incorrect password");
            }
            let token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
            //pass the token in the session table
            await context.models.Session.create({
                sid: token,
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours session
                data: JSON.stringify({ userId: user.id }),
            });
            //pass the token in the cookie
            context.res.cookie("token", token, { 
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000 // 2 hours cookie
            });
            return user;
        },

        async logout(parent, args, context) {
            context.res.clearCookie("token");
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
        },
        async categories(user) {
            return await user.getCategories();
        }
    },

    Post: {
        async user(post) {
            return await post.getUser();
        },
        async likes(post) {
            return await post.getLikes();
        }
    },

    Comment: {
        async user(comment) {
            return await comment.getUser();
        }
    },

    Like: {
        async user(like) {
            return await like.getUser();
        }
    },


};

module.exports = resolvers