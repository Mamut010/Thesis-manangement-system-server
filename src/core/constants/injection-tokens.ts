const CONSTANT_TOKENS = {
    DiContainer: Symbol.for('DiContainer'),
} as const;

const LOGGER_TOKENS = {
    Logger: Symbol.for('Logger'),
    LoggerFactory: Symbol.for('LoggerFactory'),
} as const;

const PRISMA_TOKENS = {
    Prisma: Symbol.for('Prisma'),
} as const;

const REPOSITORY_TOKENS = {
    UserRepo: Symbol.for('UserRepo'),
    RefreshTokenRepo: Symbol.for('RefreshTokenRepo'),
} as const;

const AUTH_SERVICE_TOKENS = {
    JwtService: Symbol.for('JwtService'),
    HashService: Symbol.for('HashService'),
    AuthService: Symbol.for('AuthService'),
} as const;

const API_SERVICE_TOKENS = {
    AdminService: Symbol.for('AdminService'),
    AdminStudentService: Symbol.for('AdminStudentService'),
    AdminLecturerService: Symbol.for('AdminLecturerService'),

    // Resources
    ThesisService: Symbol.for('ThesisService'),
    RoleService: Symbol.for('RoleService'),
    FieldService: Symbol.for('FieldService'),
    TopicService: Symbol.for('TopicService'),
    LocationService: Symbol.for('LocationService'),
    BachelorThesisRegistrationService: Symbol.for('BachelorThesisRegistrationService'),
    BachelorThesisAssessmentService: Symbol.for('BachelorThesisAssessmentService'),
    OralDefenseRegistrationService: Symbol.for('OralDefenseRegistrationService'),
    OralDefenseAssessmentService: Symbol.for('OralDefenseAssessmentService'),
} as const;

const SHARED_SERVICE_TOKENS = {
    MailService: Symbol.for('MailService'),
} as const;

const UTIL_TOKENS = {
    JwtExtractor: Symbol.for('JwtExtractor'),
    JwtCookieHandler: Symbol.for('JwtCookieHandler'),
    PlainTransformer: Symbol.for('PlainTransformer'),
    PrismaQueryCreator: Symbol.for('PrismaQueryCreator'),
    PdfFormFiller: Symbol.for('PdfFormFiller'),
    PdfFormGenerator: Symbol.for('PdfFormGenerator'),
} as const;

export const INJECTION_TOKENS = {
    ...CONSTANT_TOKENS,
    ...LOGGER_TOKENS,
    ...PRISMA_TOKENS,
    ...REPOSITORY_TOKENS,
    ...AUTH_SERVICE_TOKENS,
    ...API_SERVICE_TOKENS,
    ...SHARED_SERVICE_TOKENS,
    ...UTIL_TOKENS,
} as const;