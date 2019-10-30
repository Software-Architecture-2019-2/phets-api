export const compoundTypeDef = `
type AnimalPage {
    data: [Animal]!
    perPage: Int!
    page: Int!
    totalElements: Int!
}
input AnimalFilter {
    breed: String
    gender: Boolean
    adoption: Boolean
    birthdate: String
    animalType: Int
    user: String
    notUser: String
}
input Pagination {
    perPage: Int
    page: Int!
}
input PhetsFilter{
    animalId: Int!,
    username: String!
}
`;

export const compoundQueries = `
    allAnimalsByUser(username: String!): [Animal]!
    allAnimalsFilter(filter: AnimalFilter): [Animal]!
    allAnimalsPaged(pagination: Pagination!, filter: AnimalFilter): AnimalPage!
    allEventsByUser(username: String!): [Event]!
    allPhets(filter: PhetsFilter!): [Animal]
`;

export const compoundMutations = `
`;
