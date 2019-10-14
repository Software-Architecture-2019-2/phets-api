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
    match(id1: Int!, id2: Int!): Match!
`;

export const interactionMutations = `
    createInteraction(id1: Int!, id2: Int!, state:Boolean!): Interaction!
    unlikeUser(id1: Int!, id2: Int!): Interaction!
`;
