export const interactionTypeDef = `
type Interaction {
    id: Int!
    idMain: Int!
    idSecondary: Int!
    match1: Boolean!
    match2: Boolean!
}
type Match {
    state: Boolean!
}
`;

export const interactionQueries = `
    match: Match!
`;

export const interactionMutations = `
    createInteraction(idMain: Int!, idSecondary: Int!, match_1:Boolean!): Interaction!
    unlikeUser(idMain: Int!, idSecondary: Int!): Interaction!
`;
