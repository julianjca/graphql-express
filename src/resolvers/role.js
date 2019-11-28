const config = require('config');
const jwt = require('jsonwebtoken');

const {
  AuthenticationError,
} = require('apollo-server-express');
const { checkAdminRole } = require('../utils');

const resolvers = {
  Mutation: {
    createRole: (_, { name, description }, { db, req }) => {
      const isAdmin = checkAdminRole(req);

      if (!isAdmin) {
        throw new AuthenticationError('You are not authenticated');
      }

      return db.Role.create({
        name,
        description,
      });
    },
    assignRole: async (_, { email, roleNumber }, { db, req }) => {
      const isAdmin = checkAdminRole(req);

      if (!isAdmin) {
        throw new AuthenticationError('You are not authenticated');
      }

      const user = await db.User.findOne({
        where: { email },
      });

      try {
        await user.setRole(roleNumber);
        return {
          email,
          roleNumber,
          success: true,
        };
      } catch (e) {
        throw new Error('error updating role');
      }
    },
  },
};

module.exports = resolvers;
