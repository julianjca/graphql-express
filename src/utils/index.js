const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

// eslint-disable-next-line max-len
const verifyPassword = (storedPassword, inputPassword) => bcrypt.compare(inputPassword, storedPassword);

const createCookie = (res, cookieName, cookieValue, maxAge) => res.cookie(cookieName, cookieValue, {
  maxAge,
});

module.exports = {
  hashPassword,
  verifyPassword,
  createCookie,
};
