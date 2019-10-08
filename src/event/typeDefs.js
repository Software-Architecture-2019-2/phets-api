export const eventTypeDef = `
type Event {
    id: String!
    subject: String!
    description: String!
    date: String!
    animal_id: String!
    created_at: String!
    updated_at: String!
}
input EventInput {
    subject: String!
    description: String!
    date: String
    animal_id: String
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
