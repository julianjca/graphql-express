const { forEach, merge, isEmpty } = require('lodash');
const libs = require('require-all')({
  dirname: __dirname,
  recursive: true,
});

const resolvers = {
  Query: {},
  Mutation: {},
};

forEach(libs, (module) => {
  if (!isEmpty(module)) {
    const { Query = {}, Mutation = {} } = module;
    resolvers.Query = merge(resolvers.Query, Query);
    resolvers.Mutation = merge(resolvers.Mutation, Mutation);
  }
});

module.exports = resolvers;
