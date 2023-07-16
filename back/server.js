const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const multer = require('multer');

const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

const cors = require('cors');
dotenv.config();

const PORT = process.env.PORT || 5006

let app = express();

app.set('trust proxy', process.env.NODE_ENV !== 'production')

app.use(
  cors({
    credentials: true,
  })
);

// delete expired sessions token from the database every 5 minutes
setInterval(() => {
  models.Session.destroy({
    where: {
      expires: {
        [models.Sequelize.Op.lt]: new Date()
      }
    }
  });
}, 300000);


app.use(cookieParser());

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
  uploads: false,
  playground: true, 
  tracing: true, 
  context: ({ req, res }) => ({ req, res, models }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${this.filename}`)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ filename: req.file.filename })
})

models.sequelize.authenticate();
models.sequelize.sync();

let { dataInit } = require('./dataInit.js');
dataInit();

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../front/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
  });
}

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} ${server.graphqlPath}`))