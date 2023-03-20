const Badges = ["Premium", "Certified", "Staff", "Admin", "Owner"];
const models = require('./models');

const argon2 = require("argon2");


let users = [
    {
    pseudo: "admin",
    email: "admin@localhost.fr",
    phone: "0637407966",
    firstname: "admin",
    lastname: "admin",
    password: "adminadmin"
    },
    {
    pseudo: "user",
    email: "user@localhost.fr",
    phone: "0637407966",
    firstname: "user",
    lastname: "user",
    password: "usersusers"
    }

]

let posts = [
    {
        title: "Post 1",
        content: "Content 1",
        media: "https://picsum.photos/200/300",
        UserId: 9
    },
    {
        title: "Post 2",
        content: "Content 2",
        media: "https://picsum.photos/200/300",
        UserId: 9
    },
    {
        title: "Post 3",
        content: "Content 3",
        media: "https://picsum.photos/200/300",
        UserId: 8
    },
    {
        title: "Post 4",
        content: "Content 4",
        media: "https://picsum.photos/200/300",
        UserId: 9
    },

]



async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function dataInit() {
    asyncForEach(Badges, async (badge) => {
        await models.Badge.findOrCreate({where: { name: badge }})
    })

    // asyncForEach(users, async (user) => {
    //     argon2.hash(user.password).then(async (hashedPassword) => {
    //         await models.User.create({
    //             pseudo: user.pseudo,
    //             email: user.email,
    //             phone: user.phone,
    //             firstname: user.firstname,
    //             lastname: user.lastname,
    //             password: hashedPassword
    //         })
    //     })
    // })

    asyncForEach(posts, async (post) => {
        await models.Post.create({
            title: post.title,
            content: post.content,
            media: post.media,
            UserId: post.UserId
        })
    })

}

module.exports.dataInit = dataInit;