const express = require('express');
const session = require('express-session');
const { graphqlHTTP } = require('express-graphql');
const cookieParser = require('cookie-parser');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

const passport = require('passport');
const { buildContext } = require('graphql-passport');
let { initPassport } = require('./initPassport');

const cors = require('cors');

const PORT = process.env.PORT || 5006

const SESSION_SECRET = 'bad secret';


initPassport(models.User, models);
let app = express();

app.use(cors({
  credentials: true,
}));

let SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(session({
  store: new SequelizeStore({ db :models.sequelize }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'sid',
  cookie: {
    maxAge: 7200000, // 2h of livetime
    sameSite: true,
    secure: false,
  },
  // use secure cookies for production meaning they will only be sent via https
  //cookie: {path:"/", secure: true }
}));

//context: ({ req, res }) => buildContext({ req, res, models }),

app.use(passport.initialize());
app.use(passport.session());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  formatError: (err) => {
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
  playground: true, tracing: true, 
  context: ({ req, res }) => buildContext({ req, res, models }), playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});
const bodyParser = require('body-parser');

models.sequelize.authenticate();
models.sequelize.sync();

let { dataInit } = require('./datainit.js');
//dataInit();

app.get('/bla', function(req, res){
  if(req.session.page_views){
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});

server.applyMiddleware({ app, cors: false });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../front/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
  });
}
  app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}   ${server.graphqlPath}`))