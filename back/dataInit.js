const Badges = ["Premium", "Certified", "Staff", "Admin", "Owner"];
const models = require('./models');
const bcrypt = require('bcryptjs');
const saltRound = 10;

let users = [
    {
    username: "admin",
    email: "admin@localhost.fr",
    phone: "0637407966",
    firstname: "admin",
    lastname: "admin",
    password: "adminadmin"
    },
    {
    username: "user",
    email: "user@localhost.fr",
    phone: "0637407966",
    firstname: "user",
    lastname: "user",
    password: "usersusers"
    }

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

    asyncForEach(users, async (user) => {
        await models.User.create({
            username: user.username,
            email: user.email,
            phone: user.phone,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password
        })
    })

}

module.exports.dataInit = dataInit;