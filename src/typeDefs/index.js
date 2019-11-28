// const { gql } = require('apollo-server-express');
const {
  isEmpty, reduce, toArray,
} = require('lodash');
const schema = require('require-all')({
  dirname: __dirname,
  recursive: true,
});

const typeDefs = reduce(toArray(schema), (acc, obj) => {
  if (!isEmpty(obj)) {
    acc.push(obj);
  }
  return acc;
}, []);

module.exports = typeDefs;
