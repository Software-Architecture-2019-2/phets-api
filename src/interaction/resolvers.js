import { generalRequest, getRequest } from "../utilities";
import { url, port, entryPoint } from "./server";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        match: (_, { idMain, idSecondary }) =>
            getRequest(
                `${URL}/Match`,
                "GET",
                idMain,
                idSecondary
            )
    },
    Mutation: {
        createInteraction: (_, { idMain, idSecondary, match1 }) =>
            generalRequest(
                `${URL}/Create`,
                "POST",
                idMain,
                idSecondary,
                match1
            ),
        unlikeUser: (_, { idMain, idSecondary }) =>
            generalRequest(
                `${URL}/Unlike`,
                "PUT",
                idMain,
                idSecondary
            )
    }
};

export default resolvers;
