import { users } from "../models/index.js";

export default {
  Query: {
    users: () => Object.values(users),
    user: (parent, { id }) => users[id],
    me: (parent, args, { me }) => me,
  },
  User: {
    messages: (user) =>
      Object.values(messages).filter((message) => message.userId === user.id),
  },
};
