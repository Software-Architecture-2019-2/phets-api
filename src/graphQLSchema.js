import merge from "lodash.merge";
import GraphQLJSON from "graphql-type-json";
import { makeExecutableSchema } from "graphql-tools";

import { mergeSchemas } from "./utilities";

import { eventMutations, eventQueries, eventTypeDef } from "./event/typeDefs";
import eventResolvers from "./event/resolvers";

import {
    animalMutations,
    animalQueries,
    animalTypeDef
} from "./animal/typeDefs";
import animalResolvers from "./animal/resolvers";

import {
    interactionMutations,
    interactionQueries,
    interactionTypeDef
} from "./interaction/typeDefs";
import interactionResolvers from "./interaction/resolvers";

import {
  chatTypeDef,
  chatMutations
} from "./chat/typeDefs";
import chatResolvers from "./chat/resolvers";

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
    ["scalar JSON", eventTypeDef, animalTypeDef, interactionTypeDef, chatTypeDef],
    [eventQueries, animalQueries, interactionQueries],
    [eventMutations, animalMutations, interactionMutations, chatMutations],
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        eventResolvers,
        animalResolvers,
        interactionResolvers,
        chatResolvers
    )
});
