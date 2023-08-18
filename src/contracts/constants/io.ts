export const SERVER_TO_CLIENT_EVENTS = {
    Default: {
        AuthenticateFinished: 'authenticate/finished',
    },
    Notifications: {
        Received: 'notification:received',
        MarkAsReadFinished: 'notification:mark-as-read/finished',
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