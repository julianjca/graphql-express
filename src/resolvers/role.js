const config = require('config');
const jwt = require('jsonwebtoken');

const {
  AuthenticationError,
} = require('apollo-server-express');

const JWT_SECRET = config.get('Customer.JWT');

const resolvers = {
  Mutation: {
    createRole: (_, { name, description }, { db, req }) => {
      const { cookies: { userToken } } = req;
      const { RoleId } = jwt.verify(userToken, JWT_SECRET);

      if (!RoleId || RoleId !== 1) {
        throw new AuthenticationError('You are not authenticated');
      }

      return db.Role.create({
        name,
        description,
      });
    },
  },
};

module.exports = resolvers;
