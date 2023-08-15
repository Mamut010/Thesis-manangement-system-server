import { Container, interfaces } from 'inversify';
import { Logger, LoggerInterface, LoggerFactory, DefaultLoggerFactory } from '../lib/logger';
import { INJECTION_TOKENS } from '../core/constants/injection-tokens';
import { PrismaClient } from '@prisma/client';
import { BootstrapSettingInterface } from '../lib/bootstrapper';
import { Configuration } from './configuration';
import { AuthService } from '../auth/services';
import {  AuthServiceInterface } from '../auth/interfaces';
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
    UserRepoInterface,
    RefreshTokenRepoInterface, 
    MailServiceInterface,
    JwtServiceInterface,
    HashServiceInterface,
    JwtExtractorServiceInterface,
    UuidServiceInterface,
    NotificationServiceInterface
} from '../shared/interfaces';
import { 
    UserRepo,
    RefreshTokenRepo
} from '../shared/repositories';
import { PrismaQueryCreator, PrismaQueryCreatorInterface } from '../lib/query';
import { 
    BearerJwtExtractorService,
    HashService,
    JwtService, 
    NotificationService, 
    SMTPMailService, 
    UuidService
} from '../shared/services';
import { FormFillerInterface, PdfFormFiller } from '../lib/form-filler';
import { PdfFormGenerator, PdfFormGeneratorInterface } from '../api/utils/pdf-form-generator';
import { WsSetupServiceInterface } from '../ws/interfaces';
import { WsSetupService } from '../ws/services';
import { PlainTransformer, PlainTransformerInterface } from '../shared/utils/plain-transformer';

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
}

function configAuthServerServices(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<HashServiceInterface>(INJECTION_TOKENS.HashService)
        .to(HashService)
        .inRequestScope();

    container
        .bind<AuthServiceInterface>(INJECTION_TOKENS.AuthService)
        .to(AuthService)
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
        .inSingletonScope();

    container
        .bind<JwtServiceInterface>(INJECTION_TOKENS.JwtService)
        .to(JwtService)
        .inSingletonScope();

    container
        .bind<JwtExtractorServiceInterface>(INJECTION_TOKENS.JwtExtractor)
        .to(BearerJwtExtractorService)
        .inSingletonScope();

    container
        .bind<UuidServiceInterface>(INJECTION_TOKENS.UuidService)
        .to(UuidService)
        .inSingletonScope();

    container
        .bind<NotificationServiceInterface>(INJECTION_TOKENS.NotificationService)
        .to(NotificationService)
        .inSingletonScope();
}

function configUtils(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<JwtCookieHandlerInterface>(INJECTION_TOKENS.JwtCookieHandler)
        .to(JwtCookieHandler)
        .inSingletonScope();

    container
        .bind<PlainTransformerInterface>(INJECTION_TOKENS.PlainTransformer)
        .to(PlainTransformer)
        .inSingletonScope();

    container
        .bind<PrismaQueryCreatorInterface>(INJECTION_TOKENS.PrismaQueryCreator)
        .to(PrismaQueryCreator)
        .inSingletonScope();

    container
        .bind<FormFillerInterface>(INJECTION_TOKENS.PdfFormFiller)
        .to(PdfFormFiller)
        .inSingletonScope();   

    container
        .bind<PdfFormGeneratorInterface>(INJECTION_TOKENS.PdfFormGenerator)
        .to(PdfFormGenerator)
        .inSingletonScope();
}