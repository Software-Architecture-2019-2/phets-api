export const eventTypeDef = `
type Interaction {
    id_match: Int!
    id_main: Int!
    id_secondary: Int!
    match_1: Boolean!
    match_2: Boolean!
}
`;

export const eventQueries = `
    match: Boolean!
`;

export const eventMutations = `
    createInteraction(id_main: Int!, id_secondary: Int!, match_1:Boolean!): Interaction!
    unlikeUser(id_main: Int!, id_secondary: Int!): Interaction!
`;
