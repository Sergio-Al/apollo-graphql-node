import { ApolloServer, gql } from "apollo-server";
import { config } from "dotenv";

config();

let users = {
  1: {
    id: "1",
    username: "Sergio Alejandro",
    messageIds: [1],
  },
  2: {
    id: "2",
    username: "Vicente Calderon",
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello Messages",
    userId: "1",
  },
  2: {
    id: "2",
    text: "By GraphQL",
    userId: "2",
  },
};

const me = users[1];

const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id: ID!): User

    messages: [Message!]
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    users: () => Object.values(users),
    user: (parent, { id }) => users[id],
    me: (parent, args, { me }) => me,
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id],
  },
  Message: {
    user: (message) => users[message.userId],
  },
  User: {
    messages: (user) =>
      Object.values(messages).filter((message) => message.userId === user.id),
  },
};

const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true,
  },
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.listen().then(() => {
  console.log(`
    Server is Running!
    listening on port 4000
    explore at https://studio.apollographql.com/sandbox`);
});
