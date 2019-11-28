const { gql } = require('apollo-server-express');

const Role = gql`
  type Role {
    name: String!
    description: String
  }
  type AssignRole {
    email: String
    roleNumber: Int
    success: Boolean
  }

  extend type Mutation {
    createRole(
      name: String!,
      description: String
    ): Role
    assignRole(
      email: String!
      roleNumber: Int
    ): AssignRole
  }
`;

module.exports = Role;
