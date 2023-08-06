const CONSTANT_TOKENS = {
    DiContainer: Symbol.for('DiContainer'),
}

const LOGGER_TOKENS = {
    Logger: Symbol.for('Logger'),
    LoggerFactory: Symbol.for('LoggerFactory'),
}

const PRISMA_TOKENS = {
    Prisma: Symbol.for('Prisma'),
}

const REPOSITORY_TOKENS = {
    UserRepo: Symbol.for('UserRepo'),
    RefreshTokenRepo: Symbol.for('RefreshTokenRepo'),
}

const AUTH_SERVICE_TOKENS = {
    JwtService: Symbol.for('JwtService'),
    HashService: Symbol.for('HashService'),
    AuthService: Symbol.for('AuthService'),
}

const API_SERVICE_TOKENS = {
    AdminService: Symbol.for('AdminService'),
    AdminStudentService: Symbol.for('AdminStudentService'),
    AdminLecturerService: Symbol.for('AdminLecturerService'),

    // Resources
    ThesisService: Symbol.for('ThesisService'),
    RoleService: Symbol.for('RoleService'),
    FieldService: Symbol.for('FieldService'),
}

const UTIL_TOKENS = {
    JwtExtractor: Symbol.for('JwtExtractor'),
    JwtCookieHandler: Symbol.for('JwtCookieHandler'),
    PlainTransformer: Symbol.for('PlainTransformer'),
    PrismaQueryCreator: Symbol.for('PrismaQueryCreator'),
}

export const INJECTION_TOKENS = {
    ...CONSTANT_TOKENS,
    ...LOGGER_TOKENS,
    ...PRISMA_TOKENS,
    ...REPOSITORY_TOKENS,
    ...AUTH_SERVICE_TOKENS,
    ...API_SERVICE_TOKENS,
    ...UTIL_TOKENS,
} as const;