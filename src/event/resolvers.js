import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allEvents: (_) =>
			generalRequest(`${URL}`, 'GET'),
		eventById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createEvent: (_, { event }) =>
			generalRequest(`${URL}`, 'POST', event),
		updateEvent: (_, { id, event }) =>
			generalRequest(`${URL}/${id}`, 'PUT', event),
		deleteEvent: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
