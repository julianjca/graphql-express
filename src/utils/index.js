const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

// eslint-disable-next-line max-len
const verifyPassword = (storedPassword, inputPassword) => bcrypt.compare(inputPassword, storedPassword);

const createCookie = (res, cookieName, cookieValue, maxAge) => res.cookie(cookieName, cookieValue, {
  maxAge,
});

const getIP = (req) => req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || (req.connection.socket ? req.connection.socket.remoteAddress : null);

module.exports = {
  hashPassword,
  verifyPassword,
  createCookie,
  getIP,
};
