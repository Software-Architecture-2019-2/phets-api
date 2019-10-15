import { generalRequest } from "../utilities";
import { url, port, entryPoint } from "./server";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        showNotification: (_, { id }) =>
            generalRequest(`${URL}/${id}`, "GET"),
        
        userNotifications: (_,{ id }) =>
            generalRequest(`${URL}/user_notification/${id}`, "GET"),
    },
    Mutation: {
      createNotification: (_, { notification }) =>
        generalRequest(
          `${URL}`,"POST",{"notification": notification}
        ),
      deleteNotification: (_, { id }) =>
        generalRequest(`${URL}/${id}`, "DELETE"),
        
      updateStateNotification: (_, { id }) =>
        generalRequest(`${URL}/${id}`, "PUT")
    }
};

export default resolvers;
