const CONSTANT_TOKENS = {
    DIContainer: Symbol.for('DIContainer'),
    IOServer: Symbol.for('IOServer'),
    Tracer: Symbol.for('Tracer'),
    AppMetricsHandler: Symbol.for('AppMetricsHandler'),
    EncryptedProps: Symbol.for('EncryptedProps'),
    IgnoreDecryptionProps: Symbol.for('IgnoreDecryptionProps'),
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
    LecturerRepo: Symbol.for('LecturerRepo'),
    AdminRepo: Symbol.for('AdminRepo'),
    StudentRepo: Symbol.for('StudentRepo'),
    StudentAttemptRepo: Symbol.for('StudentAttemptRepo'),
    BachelorThesisRegistrationRepo: Symbol.for('BachelorThesisRegistrationRepo'),
    BachelorThesisAssessmentRepo: Symbol.for('BachelorThesisAssessmentRepo'),
    BachelorThesisEvaluationRepo: Symbol.for('BachelorThesisEvaluationRepo'),
    OralDefenseRegistrationRepo: Symbol.for('OralDefenseRegistrationRepo'),
    OralDefenseAssessmentRepo: Symbol.for('OralDefenseAssessmentRepo'),
    ThesisRepo: Symbol.for('ThesisRepo'),
    FieldRepo: Symbol.for('FieldRepo'),
    TopicRepo: Symbol.for('TopicRepo'),
    LocationRepo: Symbol.for('LocationRepo'),
    RoleRepo: Symbol.for('RoleRepo'),
    NotificationRepo: Symbol.for('NotificationRepo'),
    ProgramRepo: Symbol.for('ProgramRepo'),

    ProcessRepo: Symbol.for('ProcessRepo'),
    RequestRepo: Symbol.for('RequestRepo'),
    GroupRepo: Symbol.for('GroupRepo'),
    RequestDataRepo: Symbol.for('RequestDataRepo'),
    RequestStakeholderRepo: Symbol.for('RequestStakeholderRepo'),
} as const;

const AUTH_SERVICE_TOKENS = {
    AuthService: Symbol.for('AuthService'),
    UserService: Symbol.for('UserService'),
} as const;

const API_SERVICE_TOKENS = {
    // Resources
    ThesisService: Symbol.for('ThesisService'),
    RoleService: Symbol.for('RoleService'),
    FieldService: Symbol.for('FieldService'),
    TopicService: Symbol.for('TopicService'),
    LocationService: Symbol.for('LocationService'),
    BachelorThesisRegistrationService: Symbol.for('BachelorThesisRegistrationService'),
    BachelorThesisAssessmentService: Symbol.for('BachelorThesisAssessmentService'),
    BachelorThesisEvaluationService: Symbol.for('BachelorThesisEvaluationService'),
    OralDefenseRegistrationService: Symbol.for('OralDefenseRegistrationService'),
    OralDefenseAssessmentService: Symbol.for('OralDefenseAssessmentService'),
    ProgramService: Symbol.for('ProgramService'),

    // Main
    AdminService: Symbol.for('AdminService'),
    AssetsService: Symbol.for('AssetsService'),
    StudentService: Symbol.for('StudentService'),
    LecturerService: Symbol.for('LecturerService'),

    RequestService: Symbol.for('RequestService'),
    GroupService: Symbol.for('GroupService'),
} as const;

const WS_SERVICE_TOKENS = {
    WsSetupService: Symbol.for('WsSetupService'),
}

const SHARED_SERVICE_TOKENS = {
    MailService: Symbol.for('MailService'),
    JwtService: Symbol.for('JwtService'),
    CryptoService: Symbol.for('CryptoService'),
    JwtExtractor: Symbol.for('JwtExtractor'),
    NotificationService: Symbol.for('NotificationService'),
    UuidService: Symbol.for('UuidService'),
    MapperService: Symbol.for('MapperService'),
} as const;

const UTIL_TOKENS = {
    JwtCookieHandler: Symbol.for('JwtCookieHandler'),
    PlainTransformer: Symbol.for('PlainTransformer'),
    PrismaQueryCreator: Symbol.for('PrismaQueryCreator'),
    PdfFormFiller: Symbol.for('PdfFormFiller'),
    PdfFormGenerator: Symbol.for('PdfFormGenerator'),
    RoomIdGenerator: Symbol.for('RoomIdGenerator'),
    IORoomTimerManager: Symbol.for('IORoomTimerManager'),
} as const;

const OTHERS_TOKENS = {
    WorkflowEngine: Symbol.for('WorkflowEngine'),
    WorkflowCoreFactory: Symbol.for('WorkflowCoreFactory'),
    WorkflowCommandFactory: Symbol.for('WorkflowCommandFactory'),
    WorkflowCommandInvoker: Symbol.for('WorkflowCommandInvoker'),
    WorkflowRequestDataProcessor: Symbol.for('WorkflowRequestDataProcessor'),
} as const;

export const INJECTION_TOKENS = {
    ...CONSTANT_TOKENS,
    ...LOGGER_TOKENS,
    ...PRISMA_TOKENS,
    ...REPOSITORY_TOKENS,
    ...AUTH_SERVICE_TOKENS,
    ...API_SERVICE_TOKENS,
    ...WS_SERVICE_TOKENS,
    ...SHARED_SERVICE_TOKENS,
    ...UTIL_TOKENS,
    ...OTHERS_TOKENS,
} as const;