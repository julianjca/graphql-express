const config = require('config');
const jwt = require('jsonwebtoken');
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');

const { hashPassword, verifyPassword, createCookie } = require('../utils');

const JWT_SECRET = config.get('Customer.JWT');

const resolvers = {
  Query: {
    users: (parent, args, { db, userId }) => {
      console.log(userId);
      return db.user.findAll();
    },
    user: (parent, args, { db }) => db.user.findOne({
      firstName: args.firstName,
    }),
    me: async (parent, args, { req, db }) => {
      const { cookies: { userToken } } = req;

      if (!userToken) throw new AuthenticationError('You are logged out');

      const { email } = jwt.verify(userToken, JWT_SECRET);
      const userData = await db.user.findOne({
        where: { email },
      });

      return userData;
    },
  },
  Mutation: {
    createUser: async (parent, {
      firstName, lastName, email, password,
    }, { db, res }) => {
      const isUserRegistered = await db.user.findOne({
        where: { email },
      });

      if (isUserRegistered) {
        throw new UserInputError('User already exist');
      }
      const hashedPassword = await hashPassword(password);

      const createdUser = await db.user.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      delete createdUser.password;

      const userToken = jwt.sign(createdUser.get({ plain: true }), JWT_SECRET);

      createCookie(res, 'userToken', userToken, 1000 * 24 * 60 * 60 * 7);

      return {
        userToken,
      };
    },
    login: async (parent, { email, password }, { db, res }) => {
      const userData = await db.user.findOne({
        where: { email },
      });

      const isUserVerified = await verifyPassword(userData.password, password);

      if (isUserVerified) {
        const userToken = await jwt.sign(userData.get({ plain: true }), JWT_SECRET);
        createCookie(res, 'userToken', userToken, 1000 * 24 * 60 * 60 * 7);

        return {
          userToken,
        };
      }
      throw new AuthenticationError('Wrong email/password');
    },
  },
};

module.exports = resolvers;
