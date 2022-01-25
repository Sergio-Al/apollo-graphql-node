export let users = {
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

export let messages = {
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

// This funciton can change the value of message when they are
// exported to another file
export function modifyMessages(value) {
  messages = value;
}
