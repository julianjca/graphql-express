const config = require('config');
const jwt = require('jsonwebtoken');
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');

const {
  hashPassword, verifyPassword, createCookie, formatPhoneNumber,
} = require('../utils');
const { logger } = require('../helpers');

const JWT_SECRET = config.get('Customer.JWT');

const resolvers = {
  Query: {
    users: (_, args, { db, req }) => {
      const { cookies: { userToken } } = req;
      const { RoleId } = jwt.verify(userToken, JWT_SECRET);

      if (RoleId !== 1 || !RoleId) {
        throw new AuthenticationError('You are not authenticated');
      }

      return db.User.findAll();
    },
    me: async (parent, args, { req, db }) => {
      const { cookies: { userToken } } = req;

      if (userToken === '') throw new AuthenticationError('You are logged out');

      const { email } = jwt.verify(userToken, JWT_SECRET);
      const userData = await db.User.findOne({
        where: { email },
        include: [
          {
            model: db.Role,
          },
        ],
      });

      logger.log({
        level: 'info',
        message: 'Hello distributed log files!',
      });

      return userData;
    },
  },
  Mutation: {
    createUser: async (_, {
      first_name, last_name, email, password, phone_number,
    }, { db, res }) => {
      const isUserRegistered = await db.User.findOne({
        where: { email },
      });

      if (isUserRegistered) {
        throw new UserInputError('User already exist');
      }
      const hashedPassword = await hashPassword(password);

      const createdUser = await db.User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone_number: formatPhoneNumber(phone_number),
      });
      delete createdUser.password;

      await createdUser.setRole(2);
      const userToken = jwt.sign(createdUser.get({ plain: true }), JWT_SECRET);

      logger.log({
        level: 'info',
        message: `NEW USER ${first_name} ${last_name || ''} - ${email}`,
      });

      createCookie(res, 'userToken', userToken, 1000 * 24 * 60 * 60 * 7);

      return {
        userToken,
      };
    },
    login: async (_, { email, password }, { db, res }) => {
      const userData = await db.User.findOne({
        where: { email },
      });


      if (userData) {
        const isUserVerified = await verifyPassword(userData.password, password);

        if (isUserVerified) {
          const userToken = await jwt.sign(userData.get({ plain: true }), JWT_SECRET);
          createCookie(res, 'userToken', userToken, 1000 * 24 * 60 * 60 * 7);

          userData.update({ last_logged_in: new Date() });

          logger.log({
            level: 'info',
            message: `LOGIN USER ${email}`,
          });

          return {
            userToken,
          };
        }
      }

      throw new AuthenticationError('Wrong email/password');
    },
  },
};

module.exports = resolvers;
