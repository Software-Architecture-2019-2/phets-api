'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	let uri = path ? `${url}/${path}` : url;
	const queryUrl = addParams(uri, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const usersTypeDef = `
type User {
    id: Int!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
}
input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
}`;

const usersQueries = `
    allUsers: [User]!
    userById(id: Int!): User!
`;

const usersMutations = `
    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: UserInput!): User!
    deleteUser(id: Int!): Int
`;

const eventTypeDef = `
type Event {
    ID: String!
    Subject: String!
    Description: String!
    Date: String!
    AnimalID: String!
}
input EventInput {
    Subject: String!
    Description: String!
    Date: String!
    AnimalID: String!
}`;

const eventQueries = `
    allEvents: [Event]!
    eventById(id: String!): Event!
`;

const eventMutations = `
    createEvent(event: EventInput!): Event!
    updateEvent(id: String!, event: EventInput!): Event!
    deleteEvent(id: String!): Event!
`;

const url = process.env.AUTH_URL;
const port = process.env.AUTH_PORT;
const entryPoint = process.env.AUTH_USERS_ENTRY;

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

const url$1 = process.env.EVENT_URL;
const port$1 = process.env.EVENT_PORT;
const entryPoint$1 = process.env.EVENT_ENTRY;

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allEvents: (_) =>
			getRequest(URL$1, ''),
		eventById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createEvent: (_, { event }) =>
			generalRequest(`${URL$1}`, 'POST', event),
		updateEvent: (_, { id, event }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', event),
		deleteEvent: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		eventTypeDef
	],
	[
		usersQueries,
		eventQueries
	],
	[
		usersMutations,
		eventMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
