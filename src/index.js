import { ApolloServer } from "apollo-server";
import { config } from "dotenv";

import schema from './schema/index.js';
import resolvers  from './resolvers/index.js';
import { users } from './models/index.js';

config();

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
