/* eslint-disable security/detect-object-injection */
const modules = require('require-all')({
  dirname: __dirname,
  recursive: true,
});
const { reduce } = require('lodash');

const helpers = reduce(modules, (acc, item, key) => {
  if (key !== 'index') {
    acc[key] = item;
  }
  return acc;
}, {});


module.exports = helpers;
