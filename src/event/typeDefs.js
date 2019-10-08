export const eventTypeDef = `
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
    Date: String
    AnimalID: String
}`;

export const eventQueries = `
    allEvents: [Event]!
    eventById(id: String!): Event!
`;

export const eventMutations = `
    createEvent(event: EventInput!): Event!
    updateEvent(id: String!, event: EventInput!): Event!
    deleteEvent(id: String!): Event!
`;
