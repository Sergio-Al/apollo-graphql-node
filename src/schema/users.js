import { gql } from "apollo-server";

export default gql`
  extend type Query {
    users: [User!]
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;
