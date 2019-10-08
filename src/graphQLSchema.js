import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './auth/users/typeDefs';

import {
	eventMutations,
	eventQueries,
	eventTypeDef
} from './event/typeDefs';

import usersResolvers from './auth/users/resolvers';
import eventResolvers from './event/resolvers';

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		usersResolvers,
		eventResolvers
	)
});
