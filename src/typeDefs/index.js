const { gql } = require('apollo-server-express');

const Schema = gql`
  type User {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    phone_number: String!
  }
  type Me {
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
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
    createUser(first_name: String!, last_name:String, email: String!, password: String!, phone_number: String!): TokenData!
    login(email: String!, password: String!): TokenData!
  }
`;

module.exports = Schema;
