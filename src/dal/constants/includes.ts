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
    topic: true,
    field: true,
} as const;

export const requestInclude = {
    state: {
        include: {
            stateType: true
        }
    },
    stakeholders: {
        select: {
            userId: true
        }
    }
} as const;