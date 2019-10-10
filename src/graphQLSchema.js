import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	eventMutations,
	eventQueries,
	eventTypeDef
} from './event/typeDefs';
import eventResolvers from './event/resolvers';

import {
	animalMutations,
	animalQueries,
	animalTypeDef
} from './animal/typeDefs';
import animalResolvers from './animal/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		eventTypeDef,
		animalTypeDef,
	],
	[
		eventQueries,
		animalQueries,
	],
	[
		eventMutations,
		animalMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		eventResolvers,
		animalResolvers,
	)
});
