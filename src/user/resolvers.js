import { generalRequest } from "../utilities";
import { url, port } from "./server";

const URL = `http://${url}:${port}`;

const resolvers = {
    Query: {
        allCountries: _ => generalRequest(`${URL}/country`, "GET"),
        allUsers: _ => generalRequest(`${URL}/user`, "GET"),
        userByUsername: (_, { username }) => generalRequest(`${URL}/user/${username}`, "GET"),
        validateSession: (_, { token }) =>
            generalRequest(`${URL}/session/validate`, "GET", token)
    },
    Mutation: {
        register: (_, { user }) =>
            generalRequest(`${URL}/auth/register`, "POST", user),
        login: (_, { credentials }) =>
            generalRequest(`${URL}/auth/login`, "POST", credentials),
        updateUser: (_, { username, user }) =>
            generalRequest(`${URL}/user/${username}`, "PUT", user),
        deleteUser: (_, { username }) =>
            generalRequest(`${URL}/user/${username}`, "DELETE"),
        destroySession: (_, { token }) =>
            generalRequest(`${URL}/session/destroy`, "DELETE", token)
    }
};

export default resolvers;
