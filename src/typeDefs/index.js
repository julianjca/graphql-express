// const { gql } = require('apollo-server-express');
const { isEmpty, map } = require('lodash');
const schema = require('require-all')({
  dirname: __dirname,
  recursive: true,
});

const typeDefs = map(schema, (element) => (!isEmpty(element) ? element : {}));
// Remove {} (empty object)
typeDefs.splice(0, 1);

module.exports = typeDefs;
