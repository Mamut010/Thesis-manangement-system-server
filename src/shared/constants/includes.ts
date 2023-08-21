export const userInclude = {
    user: true
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