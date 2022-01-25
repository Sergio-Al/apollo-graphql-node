import { ApolloServer, gql } from "apollo-server";
import { config } from "dotenv";
import { v4 as uuidV4 } from "uuid";

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

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message!
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
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidV4();
      const message = { id, text, userId: me.id };

      // updating our sample data, this is normally a write action to the database
      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) return false;

      messages = otherMessages;

      return true;
    },
    updateMessage: (parent, { id, text }) => {
      const { [id]: message } = messages;

      // This must be an operation with a database or another service
      message.text = text;

      return message;
    },
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
