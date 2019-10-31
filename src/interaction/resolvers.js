import { generalRequest, getRequest } from "../utilities";
import { url, port, entryPoint } from "./server";
import AnimalResolvers from "../animal/resolvers";
import NotificationResolvers from "../Notifications/resolvers";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {
    match: (_, { id1, id2 }) =>
      generalRequest(`${URL}/Match?id1=${id1}&id2=${id2}`, "GET"),
    matchHistory: (_, { id1 }) =>
      generalRequest(`${URL}/MatchHistory?id1=${id1}`, "GET"),
    interactionHistory: (_, { id1 }) =>
      generalRequest(`${URL}/InteractionHistory?id1=${id1}`, "GET")
  },
  Mutation: {
    createInteraction: async (_, { id1, id2, state }) => {
      const response = await generalRequest(
        `${URL}/Create?id1=${id1}&id2=${id2}&state=${state}`,
        "POST"
      );
      if (response.match1 && response.match2) {
        const animal1 = await AnimalResolvers.Query.animalById(_, { id: id1 });
        const animal2 = await AnimalResolvers.Query.animalById(_, { id: id2 });
        NotificationResolvers.Mutation.createNotification(_, {
          notification: {
            user_id: animal2.user,
            notification_body: `Has tenido un match con la mascota ${
              animal1.name
            }, ¡Haz click para ir a verlo!;${animal2.id};${animal1.id}`,
            notification_type: 1
          }
        });
      }
      return response;
    },
    unlikeUser: (_, { id1, id2 }) =>
      generalRequest(`${URL}/Unlike?id1=${id1}&id2=${id2}`, "PUT")
  }
};

export default resolvers;
