import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    name: String
  }

  type Query {
    user(id: ID!): User
    viewer: User!
  }

  type mutation {
    login(email: String!, password: String!): String
  }
`;
