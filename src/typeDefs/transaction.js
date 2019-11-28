const { gql } = require('apollo-server-express');

const Transaction = gql`
  type Transaction {
    name: String
    description: String
    UserPhoneNumber: String
    amount: Int
  }

  extend type Query {
    getAllTransactions(UserPhoneNumber: String): [Transaction]
    getTransaction(transactionId: String): Transaction
  }
  extend type Mutation {
    createTransaction(name: String, amount: Int!, description: String, UserPhoneNumber: String): Transaction
  }
`;

module.exports = Transaction;
