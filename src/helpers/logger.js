const { NODE_ENV } = process.env;
const winston = require('winston');

let level;
let transports;
let format;

switch (NODE_ENV) {
case 'development':
  level = 'verbose';
  transports = [new winston.transports.Console()];
  break;
case 'production':
  level = 'verbose';
  format = winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
  );
  transports = [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combined.log',
      level: 'verbose',
    }),
  ];
  break;
default:
  level = 'verbose';
  transports = [new winston.transports.Console()];
  break;
}

module.exports = winston.createLogger({
  level, transports, format,
});
