const { map, merge } = require('lodash');
const libs = require('require-all')(`${__dirname}`);

const resolvers = {
  Query: {},
  Mutation: {},
};
const testlib = map(libs, (lib, key) => (key !== 'index' ? lib.index : {}));

testlib.forEach((element) => {
  const { Query = {}, Mutation = {} } = element;
  resolvers.Query = merge(resolvers.Query, Query);
  resolvers.Mutation = merge(resolvers.Mutation, Mutation);
});

module.exports = resolvers;
