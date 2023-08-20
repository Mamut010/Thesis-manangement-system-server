export const userInclude = {
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