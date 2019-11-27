const { gql } = require('apollo-server-express');

const Schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  type Me {
    firstName: String!
    lastName: String!
    id: ID!
    email: String!
  }
  type TokenData {
    userToken: String!
  }
  
  type Query {
    user(firstName: String!): User
    users: [User!]!
    me: Me!
  }
  type Mutation {
    createUser(firstName: String!, lastName:String, email: String! password: String!): TokenData!
    login(email: String!, password: String!): TokenData!
  }
`;

module.exports = Schema;
