const { gql } = require('apollo-server-express');

const Role = gql`
  type Role {
    name: String!
    description: String
  }

  extend type Mutation {
    createRole(
      name: String!,
      description: String): Role
  }
`;

module.exports = Role;
