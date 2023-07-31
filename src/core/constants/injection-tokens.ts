import { makeImmutable } from "../../utils/object-helpers";

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

const SERVICE_TOKENS = {
    // Auth
    JwtService: Symbol.for('JwtService'),
    HashService: Symbol.for('HashService'),
    AuthService: Symbol.for('AuthService'),

    // REST
    AdminSelfService: Symbol.for('AdminSelfService'),
    AdminStudentService: Symbol.for('AdminStudentService'),
    AdminLecturerService: Symbol.for('AdminLecturerService'),
    AdminThesisService: Symbol.for('AdminThesisService'),
}

const UTIL_TOKENS = {
    JwtExtractor: Symbol.for('JwtExtractor'),
    JwtCookieHandler: Symbol.for('JwtCookieHandler'),
    PlainTransformer: Symbol.for('PlainTransformer'),
}

const INJECTION_TOKENS = {
    ...CONSTANT_TOKENS,
    ...LOGGER_TOKENS,
    ...PRISMA_TOKENS,
    ...REPOSITORY_TOKENS,
    ...SERVICE_TOKENS,
    ...UTIL_TOKENS,
}

makeImmutable(INJECTION_TOKENS);

export { INJECTION_TOKENS };