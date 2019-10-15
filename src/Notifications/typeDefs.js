export const notificationsTypeDef = `
type Notification {
    id: Int!
    user_id: String!
    notification_body: String!
    notification_type: Int!
    notification_state: Int!
}

type Response {
    data: String!
}

input NotificationInput {
    user_id: String!
    notification_body: String!
	notification_type: Int!
}
`;

export const notificationsQueries = `
    showNotification(id: Int!): Notification!
    userNotifications(id: Int!): [Notification!]!
`;

export const notificationsMutations = `
    deleteNotification(id: Int!): Response!
    createNotification(notification: NotificationInput!): Notification!
    updateStateNotification(id: Int!): Notification!
`;
