import { generalRequest } from "../utilities";
import { url, port, entryPoint, entryPointMail } from "./server";

const URL = `http://${url}:${port}/${entryPoint}`;
const URLMAIL = `http://${url}:${port}/${entryPointMail}`;

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
        generalRequest(`${URL}/${id}`, "PUT"),

      sendEmail: (_, { email}) =>
        generalRequest(`${URLMAIL}`,"POST",{"email": email})
    }
};

export default resolvers;
