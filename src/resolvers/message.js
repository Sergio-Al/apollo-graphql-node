import { v4 as uuidv4 } from "uuid";
import { users, messages, modifyMessages } from "../models/index.js";

export default {
  Query: {
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id],
  },
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = { id, text, userId: me.id };

      // updating our sample data, this is normally a write action to the database
      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;
      if (!message) return false;

      // i can't directly modify an imported value 
      // due to: IMMUTABLE EXPORTED MODULE VALUES
      // In order to fix that i'm using a function 
      // that changes the value of my imported value
      modifyMessages(otherMessages);

      return true;
    },
    updateMessage: (parent, { id, text }) => {
      const { [id]: message } = messages;

      // This must be an operation with a database or another service
      message.text = text;

      return message;
    },
  },
  Message: {
    user: (message) => users[message.userId],
  },
};
