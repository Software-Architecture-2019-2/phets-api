import { generalRequest } from "../utilities";
import { url, port } from "./server";

const URL = `http://${url}:${port}`;

const resolvers = {
  Mutation: {
    createMessage: (_, { message }) =>
      generalRequest(`${URL}/messages`, "POST", {"message": message}),
    deleteConversation: (_, { conversation }) =>
      generalRequest(`${URL}/messages/conversation`, "DELETE", {"conversation": conversation}),
    deleteNotifications: (_, { notification }) =>
      generalRequest(`${URL}/messages/notifications`, "DELETE", {"notification": notification})
  }
};

export default resolvers;
