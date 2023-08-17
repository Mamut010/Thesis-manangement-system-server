export const SERVER_TO_CLIENT_EVENTS = {
    Default: {
        AuthenticateSuccess: 'authenticate/success',
    },
    Notifications: {
        Received: 'notification:received',
        MarkAsReadSuccess: 'notification:mark-as-read/success',
    },
} as const;

export const CLIENT_TO_SERVER_EVENTS = {
    Default: {
        Authenticate: 'authenticate',
    },
    Notifications: {
        MarkAsRead: 'notification:mark-as-read',
    },
} as const;