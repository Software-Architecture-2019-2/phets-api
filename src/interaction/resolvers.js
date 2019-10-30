import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        match: (_, { id1, id2 }) =>
            generalRequest(`${URL}/Match?id1=${id1}&id2=${id2}`, 'GET'),
        matchHistory: (_, { id1 }) =>
            generalRequest(`${URL}/MatchHistory?id1=${id1}`, 'GET'),
        interactionHistory: (_, { id1 }) =>
            generalRequest(`${URL}/InteractionHistory?id1=${id1}`, 'GET')
    },
    Mutation: {
        createInteraction: (_, { id1, id2, state }) =>
            generalRequest(
                `${URL}/Create?id1=${id1}&id2=${id2}&state=${state}`,
                'POST'
            ),
        unlikeUser: (_, { id1, id2 }) =>
            generalRequest(`${URL}/Unlike?id1=${id1}&id2=${id2}`, 'PUT')
    }
};

export default resolvers;
