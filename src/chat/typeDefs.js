export const chatTypeDef = `
type Data {
    data: String!
}
input MessageInput {
    sent: String!
    received: String!
    content: String!
    adopt: Boolean!
}
input MailsInput {
    sent: String!
    received: String!
}
`;

export const chatMutations = `
    createMessage(message: MessageInput!): Data!
    deleteConversation(conversation: MailsInput!): Data!
    deleteNotifications(notification: MailsInput!): Data!
`;
