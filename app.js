const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const faker = require('faker');

const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers/User');
const { libs } = require('./src/graphql/resolvers');
const db = require('./src/models');

console.log(libs);

const PORT = process.env.PORT || 8080;

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

app.get('/logout', (req, res) => {
  res.clearCookie('userToken');
  res.status(200).json({
    success: true,
  });
});

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
