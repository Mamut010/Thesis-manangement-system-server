export const Sex = {
    NotKnown: 0,
    Male: 1,
    Female: 2,
    NotApplicable: 9,
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];