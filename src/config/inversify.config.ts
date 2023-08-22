import { Container, interfaces } from 'inversify';
import { Logger, LoggerInterface, LoggerFactory, DefaultLoggerFactory } from '../lib/logger';
import { INJECTION_TOKENS } from '../core/constants/injection-tokens';
import { PrismaClient } from '@prisma/client';
import { BootstrapSettingInterface } from '../lib/bootstrapper';
import { Configuration } from './configuration';
import { AuthService, UserService } from '../auth/services';
import {  AuthServiceInterface, UserServiceInterface } from '../auth/interfaces';
import { JwtCookieHandler, JwtCookieHandlerInterface } from '../auth/utils/jwt-cookie-handlers';
import { 
    AdminLecturerServiceInterface,
    AdminServiceInterface,
    AdminStudentServiceInterface, 
    ThesisServiceInterface,
    RoleServiceInterface,
    FieldServiceInterface,
    TopicServiceInterface,
    LocationServiceInterface,
    BachelorThesisRegistrationServiceInterface,
    BachelorThesisAssessmentServiceInterface,
    OralDefenseRegistrationServiceInterface,
    OralDefenseAssessmentServiceInterface,
    BachelorThesisEvaluationServiceInterface
} from '../api/interfaces';
import { 
    AdminLecturerService,
    AdminService,
    AdminStudentService, 
    ThesisService,
    RoleService,
    FieldService,
    TopicService,
    LocationService,
    BachelorThesisRegistrationService,
    BachelorThesisAssessmentService,
    OralDefenseRegistrationService,
    OralDefenseAssessmentService,
    BachelorThesisEvaluationService
} from '../api/services';
import { 
    AdminRepoInterface,
    BachelorThesisAssessmentRepoInterface,
    BachelorThesisEvaluationRepoInterface,
    BachelorThesisRegistrationRepoInterface, 
    FieldRepoInterface, 
    LecturerRepoInterface, 
    LocationRepoInterface, 
    NotificationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface, 
    RefreshTokenRepoInterface, 
    RoleRepoInterface, 
    StudentRepoInterface, 
    ThesisRepoInterface, 
    TopicRepoInterface, 
    UserRepoInterface 
} from '../dal/interfaces';
import { 
    UserRepo,
    RefreshTokenRepo,
    LecturerRepo,
    BachelorThesisRegistrationRepo,
    BachelorThesisAssessmentRepo,
    OralDefenseRegistrationRepo,
    OralDefenseAssessmentRepo,
    BachelorThesisEvaluationRepo,
    FieldRepo,
    ThesisRepo,
    TopicRepo,
    LocationRepo,
    RoleRepo,
    AdminRepo,
    StudentRepo,
    NotificationRepo
} from '../dal/repositories';
import {
    MailServiceInterface,
    JwtServiceInterface,
    CryptoServiceInterface,
    JwtExtractorServiceInterface,
    UuidServiceInterface,
    NotificationServiceInterface,
} from '../shared/interfaces';
import { 
    BearerJwtExtractorService,
    CryptoService,
    JwtService, 
    NotificationService, 
    SMTPMailService, 
    UuidService
} from '../shared/services';
import { PrismaQueryCreator, PrismaQueryCreatorInterface } from '../lib/query';
import { FormFillerInterface, PdfFormFiller } from '../lib/form-filler';
import { PdfFormGenerator, PdfFormGeneratorInterface } from '../api/utils/pdf-form-generator';
import { WsSetupServiceInterface } from '../ws/interfaces';
import { WsSetupService } from '../ws/services';
import { PlainTransformer, PlainTransformerInterface } from '../dal/utils/plain-transfomer';
import { IORoomTimerManager, IORoomTimerManagerInterface } from '../ws/utils/room-timer';
import { RoomIdGenerator, RoomIdGeneratorInterface } from '../ws/utils/room-id-generator';

export const configInversify: Configuration<Container> = (container: Container, settings?: BootstrapSettingInterface) => {
    configConstants(container, settings);
    configLogger(container, settings);
    configPrisma(container, settings);
    configRepos(container, settings);
    configAuthServerServices(container, settings);
    configApiServerServices(container, settings);
    configWsServerServices(container, settings);
    configSharedServices(container, settings);
    configUtils(container, settings);
}

function configConstants(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<Container>(INJECTION_TOKENS.DIContainer)
        .toConstantValue(container);
}

function configLogger(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<LoggerInterface>(INJECTION_TOKENS.Logger)
        .toDynamicValue((context: interfaces.Context) => (settings?.getData('logger') ?? new Logger()) as LoggerInterface)
        .inSingletonScope();

    container
        .bind<LoggerFactory>(INJECTION_TOKENS.LoggerFactory)
        .toFactory<LoggerInterface, [string?]>((context: interfaces.Context) => {
            return (scope?: string) => {
                if (typeof scope !== 'undefined') {
                    return DefaultLoggerFactory(scope);
                }
                else {
                    const logger: LoggerInterface = context.container.get(INJECTION_TOKENS.Logger);
                    return logger;
                }
            };
        });
}

function configPrisma(container: Container, settings?: BootstrapSettingInterface) {
    /**
     * Prisma manages the connection pool automatically so it is better to let it live alongside the Express app
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
     */
    container
        .bind<PrismaClient>(INJECTION_TOKENS.Prisma)
        .toDynamicValue((context: interfaces.Context) => new PrismaClient())
        .inSingletonScope();
}

function configRepos(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<UserRepoInterface>(INJECTION_TOKENS.UserRepo)
        .to(UserRepo)
        .inRequestScope();

    container
        .bind<RefreshTokenRepoInterface>(INJECTION_TOKENS.RefreshTokenRepo)
        .to(RefreshTokenRepo)
        .inRequestScope();
        
    container
        .bind<LecturerRepoInterface>(INJECTION_TOKENS.LecturerRepo)
        .to(LecturerRepo)
        .inRequestScope();

    container
        .bind<AdminRepoInterface>(INJECTION_TOKENS.AdminRepo)
        .to(AdminRepo)
        .inRequestScope();

    container
        .bind<StudentRepoInterface>(INJECTION_TOKENS.StudentRepo)
        .to(StudentRepo)
        .inRequestScope();

    container
        .bind<BachelorThesisRegistrationRepoInterface>(INJECTION_TOKENS.BachelorThesisRegistrationRepo)
        .to(BachelorThesisRegistrationRepo)
        .inRequestScope();

    container
        .bind<BachelorThesisAssessmentRepoInterface>(INJECTION_TOKENS.BachelorThesisAssessmentRepo)
        .to(BachelorThesisAssessmentRepo)
        .inRequestScope();

    container
        .bind<BachelorThesisEvaluationRepoInterface>(INJECTION_TOKENS.BachelorThesisEvaluationRepo)
        .to(BachelorThesisEvaluationRepo)
        .inRequestScope();

    container
        .bind<OralDefenseRegistrationRepoInterface>(INJECTION_TOKENS.OralDefenseRegistrationRepo)
        .to(OralDefenseRegistrationRepo)
        .inRequestScope();

    container
        .bind<OralDefenseAssessmentRepoInterface>(INJECTION_TOKENS.OralDefenseAssessmentRepo)
        .to(OralDefenseAssessmentRepo)
        .inRequestScope();

    container
        .bind<ThesisRepoInterface>(INJECTION_TOKENS.ThesisRepo)
        .to(ThesisRepo)
        .inRequestScope();

    container
        .bind<FieldRepoInterface>(INJECTION_TOKENS.FieldRepo)
        .to(FieldRepo)
        .inRequestScope();

    container
        .bind<TopicRepoInterface>(INJECTION_TOKENS.TopicRepo)
        .to(TopicRepo)
        .inRequestScope();

    container
        .bind<LocationRepoInterface>(INJECTION_TOKENS.LocationRepo)
        .to(LocationRepo)
        .inRequestScope();

    container
        .bind<RoleRepoInterface>(INJECTION_TOKENS.RoleRepo)
        .to(RoleRepo)
        .inRequestScope();

    container
        .bind<NotificationRepoInterface>(INJECTION_TOKENS.NotificationRepo)
        .to(NotificationRepo)
        .inRequestScope();
}

function configAuthServerServices(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<AuthServiceInterface>(INJECTION_TOKENS.AuthService)
        .to(AuthService)
        .inRequestScope();

    container
        .bind<UserServiceInterface>(INJECTION_TOKENS.UserService)
        .to(UserService)
        .inRequestScope();
}

function configApiServerServices(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<AdminServiceInterface>(INJECTION_TOKENS.AdminService)
        .to(AdminService)
        .inRequestScope();

    container
        .bind<AdminStudentServiceInterface>(INJECTION_TOKENS.AdminStudentService)
        .to(AdminStudentService)
        .inRequestScope();

    container
        .bind<AdminLecturerServiceInterface>(INJECTION_TOKENS.AdminLecturerService)
        .to(AdminLecturerService)
        .inRequestScope();

    // Resources
    container
        .bind<ThesisServiceInterface>(INJECTION_TOKENS.ThesisService)
        .to(ThesisService)
        .inRequestScope();

    container
        .bind<RoleServiceInterface>(INJECTION_TOKENS.RoleService)
        .to(RoleService)
        .inRequestScope();

    container
        .bind<FieldServiceInterface>(INJECTION_TOKENS.FieldService)
        .to(FieldService)
        .inRequestScope();

    container
        .bind<TopicServiceInterface>(INJECTION_TOKENS.TopicService)
        .to(TopicService)
        .inRequestScope();

    container
        .bind<LocationServiceInterface>(INJECTION_TOKENS.LocationService)
        .to(LocationService)
        .inRequestScope();

    container
        .bind<BachelorThesisRegistrationServiceInterface>(INJECTION_TOKENS.BachelorThesisRegistrationService)
        .to(BachelorThesisRegistrationService)
        .inRequestScope();

    container
        .bind<BachelorThesisAssessmentServiceInterface>(INJECTION_TOKENS.BachelorThesisAssessmentService)
        .to(BachelorThesisAssessmentService)
        .inRequestScope();

    container
        .bind<BachelorThesisEvaluationServiceInterface>(INJECTION_TOKENS.BachelorThesisEvaluationService)
        .to(BachelorThesisEvaluationService)
        .inRequestScope();

    container
        .bind<OralDefenseRegistrationServiceInterface>(INJECTION_TOKENS.OralDefenseRegistrationService)
        .to(OralDefenseRegistrationService)
        .inRequestScope();

    container
        .bind<OralDefenseAssessmentServiceInterface>(INJECTION_TOKENS.OralDefenseAssessmentService)
        .to(OralDefenseAssessmentService)
        .inRequestScope();
}

function configWsServerServices(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<WsSetupServiceInterface>(INJECTION_TOKENS.WsSetupService)
        .to(WsSetupService)
        .inSingletonScope();
}

function configSharedServices(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<MailServiceInterface>(INJECTION_TOKENS.MailService)
        .to(SMTPMailService)
        .inRequestScope();

    container
        .bind<JwtServiceInterface>(INJECTION_TOKENS.JwtService)
        .to(JwtService)
        .inSingletonScope();

    container
        .bind<JwtExtractorServiceInterface>(INJECTION_TOKENS.JwtExtractor)
        .to(BearerJwtExtractorService)
        .inSingletonScope();

    container
        .bind<CryptoServiceInterface>(INJECTION_TOKENS.CryptoService)
        .to(CryptoService)
        .inRequestScope();

    container
        .bind<UuidServiceInterface>(INJECTION_TOKENS.UuidService)
        .to(UuidService)
        .inSingletonScope();

    container
        .bind<NotificationServiceInterface>(INJECTION_TOKENS.NotificationService)
        .to(NotificationService)
        .inRequestScope();
}

function configUtils(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<JwtCookieHandlerInterface>(INJECTION_TOKENS.JwtCookieHandler)
        .to(JwtCookieHandler)
        .inRequestScope();

    container
        .bind<PlainTransformerInterface>(INJECTION_TOKENS.PlainTransformer)
        .to(PlainTransformer)
        .inRequestScope();

    container
        .bind<PrismaQueryCreatorInterface>(INJECTION_TOKENS.PrismaQueryCreator)
        .to(PrismaQueryCreator)
        .inRequestScope();

    container
        .bind<FormFillerInterface>(INJECTION_TOKENS.PdfFormFiller)
        .to(PdfFormFiller)
        .inRequestScope();   

    container
        .bind<PdfFormGeneratorInterface>(INJECTION_TOKENS.PdfFormGenerator)
        .to(PdfFormGenerator)
        .inRequestScope();

    container
        .bind<RoomIdGeneratorInterface>(INJECTION_TOKENS.RoomIdGenerator)
        .to(RoomIdGenerator)
        .inSingletonScope();

    container
        .bind<IORoomTimerManagerInterface>(INJECTION_TOKENS.IORoomTimerManager)
        .to(IORoomTimerManager)
        .inSingletonScope();
}