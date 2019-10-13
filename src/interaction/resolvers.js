import { generalRequest, getRequest } from "../utilities";
import { url, port, entryPoint } from "./server";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        match: (_, { idMgain, idSecondary }) =>
            getRequest(
                `${URL}/api/interaction/Match`,
                "GET",
                idMain,
                idSecondary
            )
    },
    Mutation: {
        createInteraction: (_, { idMain, idSecondary, match1 }) =>
            generalRequest(
                `${URL}/api/interaction/Create`,
                "POST",
                idMain,
                idSecondary,
                match1
            ),
        unlikeUser: (_, { idMain, idSecondary }) =>
            generalRequest(
                `${URL}/api/interaction/Unlike`,
                "PUT",
                idMain,
                idSecondary
            )
    }
};

export default resolvers;
