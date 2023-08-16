export const SERVER_TO_CLIENT_EVENTS = {
    Notifications: {
        Received: 'notification:received'
    }
} as const;

export const CLIENT_TO_SERVER_EVENTS = {
    Notifications: {
        MarkAsRead: 'notification:mark-as-read'
    }
} as const;