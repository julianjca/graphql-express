const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('Customer.JWT');

const resolvers = {
  Mutation: {
    createTransaction: async (_, {
      name, amount, description,
    }, { db, req }) => {
      const { cookies: { userToken } } = req;
      const { phone_number } = jwt.verify(userToken, JWT_SECRET);

      const user = await db.User.findOne({
        where: { phone_number },
      });

      if (!user) {
        throw new Error('You are unauthenticated');
      }

      db.UserTransaction.create({
        name, description, amount, UserPhoneNumber: phone_number,
      });
      return {
        name,
      };
    },
  },
};

module.exports = resolvers;
