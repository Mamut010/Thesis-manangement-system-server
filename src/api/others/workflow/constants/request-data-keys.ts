export const STORED_INDIVIDUAL_REQUEST_DATA_KEYS = {
    Supervisor1: 'supervisor1',
    Supervisor2: 'supervisor2',
} as const;

export const STORED_NON_INDIVIDUAL_REQUEST_DATA_KEYS = {
    Thesis: 'thesis',
    AttemptNo: 'attempt-no',
    AdminGroup: 'admin-group',
} as const;

export const STORED_REQUEST_DATA_KEYS = {
    ...STORED_INDIVIDUAL_REQUEST_DATA_KEYS,
    ...STORED_NON_INDIVIDUAL_REQUEST_DATA_KEYS,
} as const;

export const SPECIFIC_REQUEST_DATA_KEYS = {
    Inform: {
        Title: 'title',
        Content: 'content',
    }
}