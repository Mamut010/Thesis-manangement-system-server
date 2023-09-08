export type PlainAction = {
    actionType: { name: string },
    actionTargets: { target: { name: string } }[],
};

export type PlainActivity = {
    activityType: { name: string },
    activityTargets: { target: { name: string } }[]
};

export type PlainRequestAction = Record<string, unknown> & {
    id: string,
    transitionId: string,
    transition: {
        nextStateId: string,
    },
    action: PlainAction,
}

export type PlainRequestData = {
    name: string,
    value: string,
};