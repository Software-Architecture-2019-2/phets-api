export const userTypeDef = `
type Country {
    id: Int!
    name: String!
}
type User {
    id: Int!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    description: String
    latitude: Float
    longitude: Float
    city: String
    country: Country
    media: String
    creation: String!
    confirmed: Boolean!
}
type Token {
    token: String!
}
type TokenValid {
    valid: Boolean!
}
input TokenInput {
    token: String!
}
input UserCredentials {
    username: String!
    password: String!
}
input CountryInput {
    id: Int!
    name: String!
}
input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    description: String
    latitude: Float
    longitude: Float
    city: String
    media: String
    country: CountryInput
}`;

export const userQueries = `
    allCountries: [Country]!
    allUsers: [User]!
    userByUsername(username: String!): User!
    validateSession(token: TokenInput!): TokenValid!
`;

export const userMutations = `
    register(user: UserInput!): User!
    login(credentials: UserCredentials!): Token!
    updateUser(username: String!, user: UserInput!): User!
    deleteUser(username: String!): User!
    destroySession(token: TokenInput!): Boolean
`;
