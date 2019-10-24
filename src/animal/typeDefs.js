export const animalTypeDef = `
type AnimalType {
    id: Int!,
    value: String!
}
type Animal {
    id: Int!
    name: String!,
    user: String!,
    breed: String!,
    gender: Boolean!,
    adoption: Boolean!,
    birthdate: String!,
    animal_type: AnimalType!
    media: [String]!,
}
input AnimalTypeInput {
    id: Int!,
    value: String!
}
input AnimalInput {
    name: String!,
    user: String!,
    breed: String!,
    gender: Boolean!,
    adoption: Boolean!,
    birthdate: String!,
    animal_type: AnimalTypeInput!
    media: [String]!,
}`;

export const animalQueries = `
    allAnimals: [Animal]!
    allAnimalTypes: [AnimalType]!
    allAnimalsByUser(username: String!): [Animal]!
    animalById(id: Int!): Animal!
`;

export const animalMutations = `
    createAnimal(animal: AnimalInput!): Animal!
    updateAnimal(id: Int!, animal: AnimalInput!): Animal!
    deleteAnimal(id: Int!): Animal!
`;
