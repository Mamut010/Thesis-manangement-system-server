export const userInclude = {
    user: true
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
    student: {
        include: {
            user: true
        }
    },
    thesis: true,
    supervisor1: true,
    supervisor2: true,
} as const;

export const bachelorThesisEvaluationInclude = {
    student: {
        include: {
            user: true
        }
    },
    supervisor: true,
    thesis: true,
} as const;

export const thesisInclude = {
    topic: true,
    field: true,
} as const;