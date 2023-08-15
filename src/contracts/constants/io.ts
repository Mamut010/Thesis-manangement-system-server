export const SERVER_TO_CLIENT_EVENTS = {
    Notification: {
        Received: 'notification:received'
    }
} as const;

export const CLIENT_TO_SERVER_EVENTS = {
    Notification: {
        MarkAsRead: 'notification:mark-as-read'
    }
} as const;