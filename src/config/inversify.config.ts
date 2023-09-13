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
    BachelorThesisEvaluationServiceInterface,
    ProgramServiceInterface,
    AssetsServiceInterface,
    RequestServiceInterface,
    StudentServiceInterface,
    LecturerServiceInterface,
    GroupServiceInterface
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
    BachelorThesisEvaluationService,
    ProgramService,
    AssetsService,
    RequestService,
    StudentService,
    LecturerService,
    GroupService
} from '../api/services';
import { 
    AdminRepoInterface,
    BachelorThesisAssessmentRepoInterface,
    BachelorThesisEvaluationRepoInterface,
    BachelorThesisRegistrationRepoInterface, 
    FieldRepoInterface, 
    GroupRepoInterface, 
    LecturerRepoInterface, 
    LocationRepoInterface, 
    NotificationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface, 
    ProcessRepoInterface, 
    ProgramRepoInterface, 
    RefreshTokenRepoInterface, 
    RequestDataRepoInterface, 
    RequestRepoInterface, 
    RequestStakeholderRepoInterface, 
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
    NotificationRepo,
    ProgramRepo,
    RequestRepo,
    ProcessRepo,
    GroupRepo,
    RequestDataRepo,
    RequestStakeholderRepo
} from '../dal/repositories';
import {
    MailServiceInterface,
    JwtServiceInterface,
    CryptoServiceInterface,
    JwtExtractorServiceInterface,
    UuidServiceInterface,
    NotificationServiceInterface,
    MapperServiceInterface,
} from '../shared/interfaces';
import { 
    BearerJwtExtractorService,
    CryptoService,
    JwtService, 
    MapperService, 
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
import { BOOTSTRAP_SETTINGS_KEY } from '../settings/bootstrap-settings';
import { Tracer } from '@opentelemetry/api';
import { 
    AcceptStakeholdersActivityHandler,
    AddStakeholdersActivityHandler,
    ApplyThesisActionHandler, 
    ApproveActionHandler, 
    CancelActionHandler, 
    ConfirmActionHandler, 
    ConfirmThesisActionHandler, 
    DenyActionHandler, 
    InformAdminGroupActionHandler, 
    InformRequesterActionHandler, 
    InviteSupervisor2ActionHandler, 
    NotifyActivityHandler, 
    RejectActionHandler, 
    RejectThesisActionHandler, 
    RemoveStakeholdersActivityHandler, 
    RequestAdminGroupActionHandler, 
    RequestSupervisor1ActionHandler, 
    RequestSupervisor2ActionHandler, 
    SendEmailActivityHandler,
    TargetIdentifier, 
    WorkflowCommandFactory, 
    WorkflowCommandFactoryInterface, 
    WorkflowCommandInvokerInterface, 
    WorkflowCoreFactory, 
    WorkflowCoreFactoryInterface, 
    WorkflowEngine, 
    WorkflowEngineInterface,
    WorkflowRequestDataProcessor,
    WorkflowRequestDataProcessorInterface
} from '../api/others/workflow';
import { WorkflowCommandInvoker } from '../api/others/workflow/command-invokers/invokers/workflow-command-invoker';
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
    configWorkflow(container, settings);
}

function configConstants(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<Container>(INJECTION_TOKENS.DIContainer)
        .toConstantValue(container);

    const tracer = settings?.getData<Tracer>(BOOTSTRAP_SETTINGS_KEY.Tracer);
    if (tracer) {
        container
            .bind<Tracer>(INJECTION_TOKENS.Tracer)
            .toConstantValue(tracer);
    }

    container
        .bind<Set<string>>(INJECTION_TOKENS.EncryptedProps)
        // Username, password and email should be encrypted
        .toConstantValue(new Set(['username', 'password', 'email']));

    container
        .bind<Set<string>>(INJECTION_TOKENS.IgnoreDecryptionProps)
        // Ignore email as we want to store encrypted email in the database
        .toConstantValue(new Set(['email']));
}

function configLogger(container: Container, settings?: BootstrapSettingInterface) {
    const logger = settings?.getData<LoggerInterface>(BOOTSTRAP_SETTINGS_KEY.Logger) ?? new Logger();
    container
        .bind<LoggerInterface>(INJECTION_TOKENS.Logger)
        .toConstantValue(logger);

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
     * Prisma manages the connection pool automatically so it's better to let it live as a singleton in the Express app
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

    container
        .bind<ProgramRepoInterface>(INJECTION_TOKENS.ProgramRepo)
        .to(ProgramRepo)
        .inRequestScope();

    container
        .bind<ProcessRepoInterface>(INJECTION_TOKENS.ProcessRepo)
        .to(ProcessRepo)
        .inRequestScope();

    container
        .bind<RequestRepoInterface>(INJECTION_TOKENS.RequestRepo)
        .to(RequestRepo)
        .inRequestScope();

    container
        .bind<GroupRepoInterface>(INJECTION_TOKENS.GroupRepo)
        .to(GroupRepo)
        .inRequestScope();

    container
        .bind<RequestDataRepoInterface>(INJECTION_TOKENS.RequestDataRepo)
        .to(RequestDataRepo)
        .inRequestScope();

    container
        .bind<RequestStakeholderRepoInterface>(INJECTION_TOKENS.RequestStakeholderRepo)
        .to(RequestStakeholderRepo)
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

    container
        .bind<ProgramServiceInterface>(INJECTION_TOKENS.ProgramService)
        .to(ProgramService)
        .inRequestScope();

    // Main
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

    container
        .bind<AssetsServiceInterface>(INJECTION_TOKENS.AssetsService)
        .to(AssetsService)
        .inRequestScope();

    container
        .bind<StudentServiceInterface>(INJECTION_TOKENS.StudentService)
        .to(StudentService)
        .inRequestScope();

    container
        .bind<LecturerServiceInterface>(INJECTION_TOKENS.LecturerService)
        .to(LecturerService)
        .inRequestScope();

    container
        .bind<RequestServiceInterface>(INJECTION_TOKENS.RequestService)
        .to(RequestService)
        .inRequestScope();

    container
        .bind<GroupServiceInterface>(INJECTION_TOKENS.GroupService)
        .to(GroupService)
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

    container
        .bind<MapperServiceInterface>(INJECTION_TOKENS.MapperService)
        .to(MapperService)
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

function configWorkflow(container: Container, settings?: BootstrapSettingInterface) {
    container
        .bind<WorkflowEngineInterface>(INJECTION_TOKENS.WorkflowEngine)
        .to(WorkflowEngine)
        .inSingletonScope();

    container
        .bind<WorkflowCommandInvokerInterface>(INJECTION_TOKENS.WorkflowCommandInvoker)
        .to(WorkflowCommandInvoker)
        .inSingletonScope();

    container
        .bind<WorkflowRequestDataProcessorInterface>(INJECTION_TOKENS.WorkflowRequestDataProcessor)
        .to(WorkflowRequestDataProcessor)
        .inSingletonScope();

    container.bind(TargetIdentifier).toSelf().inRequestScope();

    container.bind(ApplyThesisActionHandler).toSelf().inRequestScope();
    container.bind(ApproveActionHandler).toSelf().inRequestScope();
    container.bind(CancelActionHandler).toSelf().inRequestScope();
    container.bind(ConfirmActionHandler).toSelf().inRequestScope();
    container.bind(ConfirmThesisActionHandler).toSelf().inRequestScope();
    container.bind(DenyActionHandler).toSelf().inRequestScope();
    container.bind(InformAdminGroupActionHandler).toSelf().inRequestScope();
    container.bind(InformRequesterActionHandler).toSelf().inRequestScope();
    container.bind(InviteSupervisor2ActionHandler).toSelf().inRequestScope();
    container.bind(RejectActionHandler).toSelf().inRequestScope();
    container.bind(RejectThesisActionHandler).toSelf().inRequestScope();
    container.bind(RequestAdminGroupActionHandler).toSelf().inRequestScope();
    container.bind(RequestSupervisor1ActionHandler).toSelf().inRequestScope();
    container.bind(RequestSupervisor2ActionHandler).toSelf().inRequestScope();
    
    container.bind(NotifyActivityHandler).toSelf().inRequestScope();
    container.bind(SendEmailActivityHandler).toSelf().inRequestScope();
    container.bind(AddStakeholdersActivityHandler).toSelf().inRequestScope();
    container.bind(RemoveStakeholdersActivityHandler).toSelf().inRequestScope();
    container.bind(AcceptStakeholdersActivityHandler).toSelf().inRequestScope();

    container
        .bind<WorkflowCoreFactoryInterface>(INJECTION_TOKENS.WorkflowCoreFactory)
        .toDynamicValue((context) => {
            return new WorkflowCoreFactory(context.container);
        })
        .inSingletonScope();

    container
        .bind<WorkflowCommandFactoryInterface>(INJECTION_TOKENS.WorkflowCommandFactory)
        .toDynamicValue(() => {
            return new WorkflowCommandFactory();
        })
        .inSingletonScope();
}