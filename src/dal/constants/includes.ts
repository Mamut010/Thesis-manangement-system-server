export const userInclude = {
    user: true
} as const;

export const studentInclude = {
    user: true,
    program: true,
    _count: {
        select: {
            studentAttempts: true
        }
    },
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
    studentAttempt: {
        include: {
            student: true,
            thesis: {
                include: {
                    creator: true
                }
            },
            supervisor2: true,
        }
    }
} as const;

export const bachelorThesisAndOralDefenseWithProgramInclude = {
    studentAttempt: {
        include: {
            student: {
                include: {
                    program: {
                        select: {
                            programAdminGroup: {
                                select: {
                                    group: {
                                        select: {
                                            id: true,
                                            users: {
                                                select: {
                                                    userId: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                    }
                }
            },
            thesis: {
                include: {
                    creator: true
                }
            },
            supervisor2: true,
        }
    }
} as const;

export const bachelorThesisEvaluationInclude = {
    studentAttempt: {
        include: {
            student: true,
            thesis: {
                include: {
                    creator: true
                }
            },
        }
    }
} as const;

export const thesisInclude = {
    creator: true,
    topic: true,
    field: true,
} as const;

export const studentAttemptInclude = {
    thesis: true,
    bachelorThesisRegistration: {
        select: {
            id: true,
        }
    },
    oralDefenseRegistration: {
        select: {
            id: true,
        }
    },
    bachelorThesisAssessment: {
        select: {
            id: true,
        }
    },
    oralDefenseAssessment: {
        select: {
            id: true,
        }
    },
    bachelorThesisEvaluation: {
        select: {
            id: true,
        }
    },
    studentAttemptRequest: {
        select: {
            requestId: true,
        }
    }
}

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