const Badges = ["Premium", "Certified", "Staff", "Admin", "Owner"];
const models = require('./models');

const argon2 = require("argon2");


let users = [
    {
    pseudo: "admin",
    image: "admin.jpg",
    email: "admin@localhost.fr",
    phone: "0637407966",
    firstname: "admin",
    lastname: "admin",
    password: "adminadmin"
    },
    {
    pseudo: "user",
    image: "dave.jpg",
    email: "user@localhost.fr",
    phone: "0637407966",
    firstname: "dave",
    lastname: "user",
    password: "usersusers"
    },
    {
    pseudo: "lea",
    image: "lea.jpg",
    email: "lea@localhost.fr",
    phone: "0637407966",
    firstname: "lea",
    lastname: "lea",
    password: "lealea"
    },
    {
    pseudo: "john",
    image: "lohn.jpg",
    email: "johndoe@localhost.fr",
    phone: "0637407966",
    firstname: "john",
    lastname: "doe",
    password: "johnjohn"
    },
    {
    pseudo: "anna",
    image: "anna.jpg",
    email: "annahills@localhost.fr",
    phone: "0637407966",
    firstname: "anna",
    lastname: "hills",
    password: "annaanna"
    },

]

let posts = [
    {
        title: "Post 1",
        content: "Content 1",
        media: "adrianna-geo-1rBg5YSi00c-unsplash.jpg",
        UserId: 4
    },
    {
        title: "Post 2",
        content: "Content 2",
        media: "anna-kolosyuk-D5nh6mCW52c-unsplash.jpg",
        UserId: 2
    },
    {
        title: "Post 3",
        content: "Content 3",
        media: "axel-ruffini-iulnjpZyWnc-unsplash.jpg",
        UserId: 3
    },
    {
        title: "Post 4",
        content: "Content 4",
        media: "dan-farrell-fT49QnFucQ8-unsplash.jpg",
        UserId: 5
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
    //             image: user.image,
    //             email: user.email,
    //             phone: user.phone,
    //             firstname: user.firstname,
    //             lastname: user.lastname,
    //             password: hashedPassword
    //         })
    //     })
    // })

    // asyncForEach(posts, async (post) => {
    //     await models.Post.create({
    //         title: post.title,
    //         content: post.content,
    //         media: post.media,
    //         UserId: post.UserId
    //     })
    // })

}

module.exports.dataInit = dataInit;