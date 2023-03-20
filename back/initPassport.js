let passport = require('passport');
let { GraphQLLocalStrategy } = require('graphql-passport');
let user = require('./models/user');
let argon2 = require('argon2');


exports.initPassport = (User, models) => {
    passport.use(
        new GraphQLLocalStrategy(function (email, password, done) {
            console.log(email)
            console.log(password)
            User.findOne({
                where: {
                    email: email
                }
            }).then(matchingAccount => {
                let error = matchingAccount ? null : new Error('no matching user');
                if (error) {
                    done(error, null)
                }
                if (argon2.verify(matchingAccount.password, password)) {
                    const user = matchingAccount;
                    console.log("login")
                    done(error, user);
                }
                else {
                    error = new Error('password wrong');
                    done(error, user)
                }

            }).catch(err => done(err));

        }),
    );

    passport.serializeUser((user, done) => {
        console.log("serializeing", user.id)
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        console.log("deserializeing", id)
        //done(null, {user : {id : id}})

        User.findOne({
            where: {
                id: id
            },
        }).then(user => {
            if (user) {
                done(null, user);

            } else {
                done(user.errors, null);

            }
        })
    });
};

