export const DEFAULT_FORMATS = {
    Action: {
        ConfirmThesis: {
            Content: `Student <{0}> wanted to apply to thesis '{1}'`,
        },
        InviteSupervisor2: {
            Content: `{0} <{1}> has invited you to join the thesis '{2}'`,
        },
    },
    Activity: {
        Notification: {
            Content: `Request <{0}>'s state has been updated`,
        },
        Email: {
            Content: `Request <{0}>'s state has been updated. For more information, please access VGU Thesis Management site.`,
        },
    },
} as const;