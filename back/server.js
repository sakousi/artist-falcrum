const express = require('express');
const session = require('express-session');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 5006

const models = require('./models');

const SESSION_SECRECT = 'bad secret';
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

let app = express();

const corsOptions = {

  credentials: true,
};
app.use(cors(corsOptions));
  var SequelizeStore = require("connect-session-sequelize")(session.Store);

  app.use(session({
    store: new SequelizeStore({db :models.sequelize}),
    secret: SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
    name: 'sid', // name of the cookie
    cookie : {
      maxAge: 7200000, // 2h of livetime
      SameSite: true, // only usable on the same domain
      secure: false, // false for devloppement

      },
    // use secure cookies for production meaning they will only be sent via https
    //cookie: {path:"/", secure: true }
  }));

  context: ({ req, res }) => buildContext({ req, res, models }),

app.use(passport.initialize());
app.use(passport.session());
const server = new ApolloServer({ typeDefs,
    resolvers,
    introspection:true,
    formatError : (err) => {
      if (err.message.startsWith("Database Error: ")) {
        return new Error('Internal server error');
      }
      if (err.message.startsWith("Validation"))
        return new Error("Internal")
      console.log(err)
      // Otherwise return the original error.  The error can also
      // be manipulated in other ways, so long as it's returned.
      return err;
    },
    playground:true, tracing:true, context: ({ req, res }) => buildContext({ req, res, models }),  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },});

models.sequelize.authenticate();
models.sequelize.sync();

server.applyMiddleware({ app, cors: false });
 if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../front/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
  });
} 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}   ${server.graphqlPath}`))