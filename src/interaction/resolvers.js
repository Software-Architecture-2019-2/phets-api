import { generalRequest, getRequest } from "../utilities";
import { url, port, entryPoint } from "./server";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        match: _ => generalRequest(`${URL}/Match`, "GET")
    },
    Mutation: {
        createInteraction: (_, { id_main, id_secondary, match_1 }) =>
            generalRequest(`${URL}/Create`, "POST", interaction),
        unlikeUser: (_, { id_main, id_secondary }) =>
            generalRequest(`${URL}/Unlike`, "PUT", interaction)
    }
};

export default resolvers;
