const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const faker = require('faker');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const db = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const userId = req.headers.authorization || '';
    return {
      db,
      userId,
      res,
      req,
    };
  },
});

const app = express();
app.use(cookieParser())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));
server.applyMiddleware({ app });

app.get('/logout', (_, res) => {
  res.clearCookie('userToken');
  res.status(200).json({
    success: true,
  });
});

module.exports = app;
