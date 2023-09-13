export const userInclude = {
    user: true
} as const;

export const studentInclude = {
    user: true,
    program: true,
} as const;

export const roleInclude = {
    role: true
} as const;

export const userWithRoleInclude = {
    user: {
        include: {
            role: true
        }
    }
} as const;

export const bachelorThesisAndOralDefenseInclude = {
    student: true,
    thesis: true,
    supervisor1: true,
    supervisor2: true,
} as const;

export const bachelorThesisAndOralDefenseWithAdminInclude = {
    student: true,
    thesis: true,
    supervisor1: true,
    supervisor2: true,
    admin: true
} as const;

export const bachelorThesisEvaluationInclude = {
    student: true,
    supervisor: true,
    thesis: true,
} as const;

export const thesisInclude = {
    creator: true,
    topic: true,
    field: true,
} as const;

export const requestInclude = {
    state: {
        include: {
            stateType: true
        }
    },
    requestStakeholders: true
} as const;

export const groupInclude = {
    users: true
} as const;

export const requestStakeholderInclude = {
    group: {
        include: {
            users: true
        }
    }
} as const;