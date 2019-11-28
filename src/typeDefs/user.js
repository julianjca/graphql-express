const { gql } = require('apollo-server-express');

const User = gql`
  type User {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    phone_number: String!
    role: Role
  }
  type Me {
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
    RoleId: Int
    Role: Role
  }
  type TokenData {
    userToken: String!
  }

  extend type Query {
    users: [User!]!
    me: Me!
  }
  extend type Mutation {
    createUser(
      first_name: String!, 
      last_name:String, 
      email: String!, 
      password: String!, 
      phone_number: String!
    ): TokenData!
    login(
      email: String!,
      password: String!
    ): TokenData!
  }
`;

module.exports = User;
