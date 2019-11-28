const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('Customer.JWT');

const SALT_ROUNDS = 10;

const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

// eslint-disable-next-line max-len
const verifyPassword = (storedPassword, inputPassword) => bcrypt.compare(inputPassword, storedPassword);

const createCookie = (res, cookieName, cookieValue, maxAge) => res.cookie(cookieName, cookieValue, {
  maxAge,
});

const checkAdminRole = (req) => {
  const { cookies: { userToken = null } } = req;
  const { RoleId = null } = jwt.verify(userToken, JWT_SECRET);
  return RoleId && RoleId === 1;
};

const formatPhoneNumber = (phoneNumber) => {
  const firstDigit = phoneNumber[0];
  if (firstDigit === '+') {
    return phoneNumber.substr(1);
  } if (firstDigit === '0') {
    return `62${phoneNumber.substr(1)}`;
  }
  return phoneNumber;
};

const getIP = (req) => req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || (req.connection.socket ? req.connection.socket.remoteAddress : null);

module.exports = {
  hashPassword,
  verifyPassword,
  createCookie,
  getIP,
  checkAdminRole,
  formatPhoneNumber,
};
