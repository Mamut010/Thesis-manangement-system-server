import { PrismaClient } from "@prisma/client";
import { Seeder } from "./seeder";
import { ROLES, ROLE_IDS } from "../roles";
import { hash } from "../utils/crypto";
import { email } from "../utils/credentials";
import { Sex } from "../types/sex";
import { PascalCaseToStandard, trimPrefix } from "../utils/helpers";

export const DefaultSeeder: Seeder = async (prisma: PrismaClient) => {
    await prisma.$transaction([
        ...seedData(prisma),
        ...seedWorkflow(prisma)
    ]);
}

function seedData(prisma: PrismaClient) {
    return [
        prisma.role.createMany({
            data: ROLES.map(role => { return { name: role, description: `The ${role}` }; })
        }),
        prisma.user.createMany({
            data: [
                { 
                    userId: '1', username: 'admin1', password: hash('1234'), email: email('1'),
                    roleId: ROLE_IDS['Admin'],
                },
                { 
                    userId: '2', username: 'admin2', password: hash('1234'), email: email('2'),
                    roleId: ROLE_IDS['Admin'],
                },
                { 
                    userId: '3', username: 'admin3', password: hash('1234'), email: email('3'),
                    roleId: ROLE_IDS['Admin'],
                },
                { 
                    userId: '101', username: 'lecturer1.1', password: hash('lecturer1.1'), email: email('101'),
                    roleId: ROLE_IDS['Lecturer1.1'],
                },
                { 
                    userId: '401', username: 'lecturer1.2', password: hash('lecturer1.2'), email: email('401'),
                    roleId: ROLE_IDS['Lecturer1.2'],
                },
                { 
                    userId: '701', username: 'lecturer2', password: hash('lecturer2'), email: email('701'),
                    roleId: ROLE_IDS['Lecturer2'],
                },
                { 
                    userId: '10001', username: 'student1', password: hash('student1'), email: email('10001'),
                    roleId: ROLE_IDS['Student'],
                },
                { 
                    userId: '10002', username: 'student2', password: hash('student2'), email: email('10002'),
                    roleId: ROLE_IDS['Student'],
                },
                { 
                    userId: '10003', username: 'student3', password: hash('student3'), email: email('10003'),
                    roleId: ROLE_IDS['Student'],
                },
                { 
                    userId: '10004', username: 'student4', password: hash('student4'), email: email('10004'),
                    roleId: ROLE_IDS['Student'],
                },
            ]
        }),
        prisma.admin.createMany({
            data: [
                { userId: '1', title: 'CSE Program', contact: 'ABC City' },
                { userId: '2', title: 'Mr. Fred', contact: 'HCM City' },
                { userId: '3', title: 'MEN Program', contact: 'Da Lat' },
            ]
        }),
        prisma.lecturer.createMany({
            data: [
                { userId: '101', title: 'Dr. A11', bio: 'Sample lecturer1.1' },
                { userId: '401', title: 'Dr. A12', bio: 'Sample lecturer1.2' },
                { userId: '701', title: 'Dr. A2', bio: 'Sample lecturer2' },
            ]
        }),
        prisma.program.createMany({
            data: [
                { title: 'CSE', description: 'Computer Science Engineering' },
                { title: 'MEN', description: 'Mechanical Engineering' },
            ]
        }),
        prisma.student.createMany({
            data: [
                { userId: '10001', programId: 1, intake: 2019, surname: 'Doe', forename: 'John', sex: Sex.Male },
                { userId: '10002', programId: 1, intake: 2019, surname: 'Doe', forename: 'Jane', sex: Sex.Female },
                { userId: '10003', programId: 2, intake: 2021, surname: 'Doe', forename: 'Mary', sex: Sex.Female },
                { userId: '10004', programId: 2, intake: 2021, surname: 'Doe', forename: 'Katy', sex: Sex.Female },
            ]
        }),
        prisma.topic.createMany({
            data: [
                { title: 'Thesis Management System', description: 'Sample topic description' },
            ]
        }),
        prisma.field.createMany({
            data: [
                { title: 'WD', description: 'Web development' },
            ]
        }),
        prisma.thesis.createMany({
            data: [
                { topicId: 1, fieldId: 1, creatorId: '101', title: 'Thesis Management System: BE' },
                { topicId: 1, fieldId: 1, creatorId: '401', title: 'Thesis Management System: FE' },
            ]
        }),
        prisma.location.createMany({
            data: [
                { title: 'Admin Room', description: 'Sample location description 1' },
                { title: 'Academic Cluster', description: 'Sample location description 2' },
            ]
        }),
        prisma.studentAttempt.createMany({
            data: [
                { id: '1', studentId: '10003', attemptNo: 1, thesisId: 1, supervisor2Id: '401' },
                { id: '2', studentId: '10004', attemptNo: 1, thesisId: 2, supervisor2Id: '701' },
            ]
        }),
        prisma.bachelorThesisRegistration.createMany({
            data: [
                { 
                    studentAttemptId: '1',
                    furtherParticipants: 'Katy Doe',
                },
                { 
                    studentAttemptId: '2',
                    furtherParticipants: 'Mary Doe',
                },
            ]
        }),
        prisma.oralDefenseRegistration.createMany({
            data: [
                { 
                    studentAttemptId: '1',
                },
                { 
                    studentAttemptId: '2',
                },
            ]
        }),
        prisma.bachelorThesisAssessment.createMany({
            data: [
                { 
                    studentAttemptId: '1',
                    furtherParticipants: 'Katy Doe',
                    supervisor1Grade: 1, supervisor2Grade: 1,
                },
                { 
                    studentAttemptId: '2',
                    furtherParticipants: 'Mary Doe',
                    supervisor1Grade: 1, supervisor2Grade: 1,
                }
            ]
        }),
        prisma.oralDefenseAssessment.createMany({
            data: [
                { 
                    studentAttemptId: '1',
                    supervisor1Grade: 1.3, supervisor2Grade: 1.3,
                },
                { 
                    studentAttemptId: '2',
                    supervisor1Grade: 1, supervisor2Grade: 1.7,
                },
            ]
        }),
        prisma.bachelorThesisEvaluation.createMany({
            data: [
                {
                    studentAttemptId: '1', date: new Date(),
                },
                {
                    studentAttemptId: '2',
                }
            ]
        }),
    ];
}

const Id = {
    Process: {
        Thesis: 'Process-Thesis',
    },
    Group: {
        Thesis_CSEAdmins: 'Group-Thesis_CSEAdmins',
        Thesis_MENAdmins: 'Group-Thesis_MENAdmins',
    },
    Target: {
        Requester: 'Target-Requester',
        Supervisor1: 'Target-Supervisor1',
        Supervisor2: 'Target-Supervisor2',
        Stakeholders: 'Target-Stakeholders',
        AdminGroup: 'Target-AdminGroup',
    },
    StateType: {
        Initial: 'StateType-Initial',
        Normal: 'StateType-Normal',
        Completed: 'StateType-Completed',
        Denied: 'StateType-Denied',
        Cancelled: 'StateType-Cancelled',
    },
    State: {
        FindingThesis: 'State-FindingThesis',
        RequestCreateThesisSentToAdmin: 'State-RequestCreateThesisSentToAdmin',
        AdminApprovedCreateThesisRequest: 'State-AdminApprovedCreateThesisRequest',
        AdminDeniedCreateThesisRequest: 'State-AdminDeniedCreateThesisRequest',
        ThesisApplied: 'State-ThesisApplied',
        RequestApplyThesisSentToSup1: 'State-RequestApplyThesisSentToSup1',
        Sup1ApprovedThesisApplication: 'State-Sup1ApprovedThesisApplication',
        FindingSup2: 'State-FindingSup2',
        RequestApplyThesisSentToSup2: 'State-RequestApplyThesisSentToSup2',
        Sup2ApprovedThesisApplication: 'State-Sup2ApprovedThesisApplication',
        RequestPermissionToFillBTRSentToAdmin: 'State-RequestPermissionToFillBTRSentToAdmin',
        AdminDeniedPermissionToFillBTRRequest: 'State-AdminDeniedPermissionToFillBTRRequest',
        StudentFillingBTRForm: 'State-StudentFillingBTRForm',
        StudentFilledBTRForm:'State-StudentFilledBTRForm',
        RequestApproveBTRFormSentToSup1: 'State-RequestApproveBTRFormSentToSup1',
        RequestApproveBTRFormSentToSup2: 'State-RequestApproveBTRFormSentToSup2',
        RequestApproveBTRFormSentToAdmin: 'State-RequestApproveBTRFormSentToAdmin',
        AdminDeniedApproveBTRFormRequest: 'State-AdminDeniedApproveBTRFormRequest',
        AdminFillingBTRequirements: 'State-AdminFillingBTRequirements',
        AdminFilledBTRequirements: 'State-AdminFilledBTRequirements',
        BTRequirementsSentToStudent: 'State-BTRequirementsSentToStudent',

        RequestBTEFormSentToSup1: 'State-RequestBTEFormSentToSup1',
        Sup1DeniedThesis: 'State-Sup1DeniedThesis',
        Sup1ApprovedThesis: 'State-Sup1ApprovedThesis',
        Sup1SubmittedBTEForm: 'State-Sup1SubmittedBTEForm',
        AdminDeniedPermissionToFillODRForm: 'State-AdminDeniedPermissionToFillODRForm',
        StudentFillingODRForm: 'State-StudentFillingODRForm',
        StudentFilledODRForm: 'State-StudentFilledODRForm',
        RequestFinalizeODRFormSentToAdmin: 'State-RequestFinalizeODRFormSentToAdmin',
        AdminFinalizedODRForm: 'State-AdminFinalizedODRForm',
        ODRDetailSentToStudent: 'State-ODRDetailSentToStudent',
        RequestAssessmentsSentToSups: 'State-RequestAssessmentsSentToSups',
        Sup1ConfirmedAssessmentsAwaitingSup2: 'State-Sup1ConfirmedAssessmentsAwaitingSup2',
        Sup2ConfirmedAssessmentsAwaitingSup1: 'State-Sup2ConfirmedAssessmentsAwaitingSup1',
        SupsConfirmedAssessments: 'State-SupsConfirmedAssessments',
        AssessmentsSentToAdmin: 'State-AssessmentsSentToAdmin',
        AdminConfirmedAssessments: 'State-AdminConfirmedAssessments',

        // Special state
        RequestCancelled: 'State-RequestCancelled'
    },
    Transition: {
        FindingThesis_RequestCreateThesisSentToAdmin: 'Transition-FindingThesis_RequestCreateThesisSentToAdmin',
        RequestCreateThesisSentToAdmin_AdminApprovedCreateThesisRequest: 'Transition-RequestCreateThesisSentToAdmin_AdminApprovedCreateThesisRequest',
        RequestCreateThesisSentToAdmin_AdminDeniedCreateThesisRequest: 'Transition-RequestCreateThesisSentToAdmin_AdminDeniedCreateThesisRequest',
        FindingThesis_ThesisApplied: 'Transition-FindingThesis_ThesisApplied',
        ThesisApplied_FindingThesis: 'Transition-ThesisApplied_FindingThesis',
        ThesisApplied_RequestApplyThesisSentToSup1: 'Transition-ThesisApplied_RequestApplyThesisSentToSup1',
        RequestApplyThesisSentToSup1_FindingThesis: 'Transition-RequestApplyThesisSentToSup1_FindingThesis',
        RequestApplyThesisSentToSup1_Sup1ApprovedThesisApplication: 'Transition-RequestApplyThesisSentToSup1_Sup1ApprovedThesisApplication',
        Sup1ApprovedThesisApplication_FindingSup2: 'Transition-Sup1ApprovedThesisApplication_FindingSup2',
        FindingSup2_RequestApplyThesisSentToSup2: 'Transition-FindingSup2_RequestApplyThesisSentToSup2',
        RequestApplyThesisSentToSup2_FindingSup2: 'Transition-RequestApplyThesisSentToSup2_FindingSup2',
        RequestApplyThesisSentToSup2_Sup2ApprovedThesisApplication: 'Transition-RequestApplyThesisSentToSup2_Sup2ApprovedThesisApplication',
        Sup2ApprovedThesisApplication_RequestPermissionToFillBTRSentToAdmin: 'Transition-Sup2ApprovedThesisApplication_RequestPermissionToFillBTRSentToAdmin',
        RequestPermissionToFillBTRSentToAdmin_AdminDeniedPermissionToFillBTRRequest: 'Transition-RequestPermissionToFillBTRSentToAdmin_AdminDeniedPermissionToFillBTRRequest',
        RequestPermissionToFillBTRSentToAdmin_StudentFillingBTRForm: 'Transition-RequestPermissionToFillBTRSentToAdmin_StudentFillingBTRForm',
        StudentFillingBTRForm_StudentFilledBTRForm: 'Transition-StudentFillingBTRForm_StudentFilledBTRForm',
        StudentFilledBTRForm_StudentFillingBTRForm: 'Transition-StudentFilledBTRForm_StudentFillingBTRForm',
        StudentFilledBTRForm_RequestApproveBTRFormSentToSup1: 'Transition-StudentFilledBTRForm_RequestApproveBTRFormSentToSup1',
        RequestApproveBTRFormSentToSup1_StudentFillingBTRForm: 'Transition-RequestApproveBTRFormSentToSup1_StudentFillingBTRForm',
        RequestApproveBTRFormSentToSup1_RequestApproveBTRFormSentToSup2: 'Transition-RequestApproveBTRFormSentToSup1_RequestApproveBTRFormSentToSup2',
        RequestApproveBTRFormSentToSup2_StudentFillingBTRForm: 'Transition-RequestApproveBTRFormSentToSup2_StudentFillingBTRForm',
        RequestApproveBTRFormSentToSup2_RequestApproveBTRFormSentToAdmin: 'Transition-RequestApproveBTRFormSentToSup2_RequestApproveBTRFormSentToAdmin',
        RequestApproveBTRFormSentToAdmin_StudentFillingBTRForm: 'Transition-RequestApproveBTRFormSentToAdmin_StudentFillingBTRForm',
        RequestApproveBTRFormSentToAdmin_AdminDeniedApproveBTRFormRequest: 'Transition-RequestApproveBTRFormSentToAdmin_AdminDeniedApproveBTRFormRequest',
        RequestApproveBTRFormSentToAdmin_AdminFillingBTRequirements: 'Transition-RequestApproveBTRFormSentToAdmin_AdminFillingBTRequirements',
        AdminFillingBTRequirements_AdminFilledBTRequirements: 'Transition-AdminFillingBTRequirements_AdminFilledBTRequirements',
        AdminFilledBTRequirements_AdminFillingBTRequirements: 'Transition-AdminFilledBTRequirements_AdminFillingBTRequirements',
        AdminFilledBTRequirements_BTRequirementsSentToStudent: 'Transition-AdminFilledBTRequirements_BTRequirementsSentToStudent',
    
        BTRequirementsSentToStudent_RequestBTEFormSentToSup1: 'Transition-BTRequirementsSentToStudent_RequestBTEFormSentToSup1',
        RequestBTEFormSentToSup1_Sup1DeniedThesis: 'Transition-RequestBTEFormSentToSup1_Sup1DeniedThesis',
        RequestBTEFormSentToSup1_Sup1ApprovedThesis: 'Transition-RequestBTEFormSentToSup1_Sup1ApprovedThesis',
        Sup1ApprovedThesis_Sup1SubmittedBTEForm: 'Transition-Sup1ApprovedThesis_Sup1SubmittedBTEForm',
        Sup1SubmittedBTEForm_AdminDeniedPermissionToFillODRForm: 'Transition-Sup1SubmittedBTEForm_AdminDeniedPermissionToFillODRForm',
        Sup1SubmittedBTEForm_StudentFillingODRForm: 'Transition-Sup1SubmittedBTEForm_StudentFillingODRForm',
        StudentFillingODRForm_StudentFilledODRForm: 'Transition-StudentFillingODRForm_StudentFilledODRForm',
        StudentFilledODRForm_StudentFillingODRForm: 'Transition-StudentFilledODRForm_StudentFillingODRForm',
        StudentFilledODRForm_RequestFinalizeODRFormSentToAdmin: 'Transition-StudentFilledODRForm_RequestFinalizeODRFormSentToAdmin',
        RequestFinalizeODRFormSentToAdmin_AdminFinalizedODRForm: 'Transition-RequestFinalizeODRFormSentToAdmin_AdminFinalizedODRForm',
        AdminFinalizedODRForm_RequestFinalizeODRFormSentToAdmin: 'Transition-AdminFinalizedODRForm_RequestFinalizeODRFormSentToAdmin',
        AdminFinalizedODRForm_ODRDetailSentToStudent: 'Transition-AdminFinalizedODRForm_ODRDetailSentToStudent',
        ODRDetailSentToStudent_RequestAssessmentsSentToSups: 'Transition-ODRDetailSentToStudent_RequestAssessmentsSentToSups',
        RequestAssessmentsSentToSups_Sup1ConfirmedAssessmentsAwaitingSup2: 'Transition-RequestAssessmentsSentToSups_Sup1ConfirmedAssessmentsAwaitingSup2',
        RequestAssessmentsSentToSups_Sup2ConfirmedAssessmentsAwaitingSup1: 'Transition-RequestAssessmentsSentToSups_Sup2ConfirmedAssessmentsAwaitingSup1',
        Sup1ConfirmedAssessmentsAwaitingSup2_RequestAssessmentsSentToSups: 'Transition-Sup1ConfirmedAssessmentsAwaitingSup2_RequestAssessmentsSentToSups',
        Sup1ConfirmedAssessmentsAwaitingSup2_SupsConfirmedAssessments: 'Transition-Sup1ConfirmedAssessmentsAwaitingSup2_SupsConfirmedAssessments',
        Sup2ConfirmedAssessmentsAwaitingSup1_RequestAssessmentsSentToSups: 'Transition-Sup2ConfirmedAssessmentsAwaitingSup1_RequestAssessmentsSentToSups',
        Sup2ConfirmedAssessmentsAwaitingSup1_SupsConfirmedAssessments: 'Transition-Sup2ConfirmedAssessmentsAwaitingSup1_SupsConfirmedAssessments',
        SupsConfirmedAssessments_Sup1ConfirmedAssessmentsAwaitingSup2: 'Transition-SupsConfirmedAssessments_Sup1ConfirmedAssessmentsAwaitingSup2',
        SupsConfirmedAssessments_Sup2ConfirmedAssessmentsAwaitingSup1: 'Transition-SupsConfirmedAssessments_Sup2ConfirmedAssessmentsAwaitingSup1',
        SupsConfirmedAssessments_AssessmentsSentToAdmin: 'Transition-SupsConfirmedAssessments_AssessmentsSentToAdmin',
        AssessmentsSentToAdmin_AdminConfirmedAssessments: 'Transition-AssessmentsSentToAdmin_AdminConfirmedAssessments',
    },
    ActionType: {
        Approve: 'ActionType-Approve',
        Back: 'ActionType-Back',
        Confirm: 'ActionType-Confirm',
        Reject: 'ActionType-Reject',
        RequestAdminGroup: 'ActionType-RequestAdminGroup',
        RequestSupervisor1: 'ActionType-RequestSupervisor1',
        RequestSupervisor2: 'ActionType-RequestSupervisor2',
        RequestSupervisors: 'ActionType-RequestSupervisors',
        InformAdminGroup: 'ActionType-InformAdminGroup',
        InformRequester: 'ActionType-InformRequester',
        InviteSupervisor2: 'ActionType-InviteSupervisor2',
        Deny: 'ActionType-Deny',
        Cancel: 'ActionType-Cancel',

        // Variants
        ApplyThesis: 'ActionType-ApplyThesis',
        RejectThesis: 'ActionType-RejectThesis',
        ConfirmThesis: 'ActionType-ConfirmThesis',

        ApprovePermissionBachelorThesisRegistration: 'ActionType-ApprovePermissionBachelorThesisRegistration',
        ApprovePermissionOralDefenseRegistration: 'ActionType-ApprovePermissionOralDefenseRegistration',

        RejectBachelorThesisRegistration: 'ActionType-RejectBachelorThesisRegistration',
        ApproveBachelorThesisRegistration: 'ActionType-ApproveBachelorThesisRegistration',
        ApproveBachelorThesisEvaluation: 'ActionType-ApproveBachelorThesisEvaluation',

        BackBachelorThesisRegistration: 'ActionType-BackBachelorThesisRegistration',
        BackOralDefenseRegistration: 'ActionType-BackOralDefenseRegistration',
        BackAssessments: 'ActionType-BackAssessments',
        ConfirmBachelorThesisRegistration: 'ActionType-ConfirmBachelorThesisRegistration',
        ConfirmOralDefenseRegistration: 'ActionType-ConfirmOralDefenseRegistration',
        ConfirmAssessments: 'ActionType-ConfirmAssessments',
    },
    Action: {
        Requester_ApplyThesis: 'Action-Requester_ApplyThesis',
        Requester_RejectThesis: 'Action-Requester_RejectThesis',
        Requester_RequestAdminGroup: 'Action-Requester_RequestAdminGroup',
        Requester_RequestSupervisor1: 'Action-Requester_RequestSupervisor1',
        Requester_Confirm: 'Action-Requester_Confirm',
        Requester_ConfirmThesis: 'Action-Requester_ConfirmThesis',
        Requester_InformAdminGroup: 'Action-Requester_InformAdminGroup',
        Requester_Cancel: 'Action-Requester_Cancel',
        Requester_ConfirmBachelorThesisRegistration: 'Action-Requester_ConfirmBachelorThesisRegistration',
        Requester_ConfirmOralDefenseRegistration: 'Action-Requester_ConfirmOralDefenseRegistration',
        Requester_BackBachelorThesisRegistration: 'Action-Requester_BackBachelorThesisRegistration',
        Requester_BackOralDefenseRegistration: 'Action-Requester_BackOralDefenseRegistration',

        AdminGroup_Approve: 'Action-AdminGroup_Approve',
        AdminGroup_Confirm: 'Action-AdminGroup_Confirm',
        AdminGroup_Deny: 'Action-AdminGroup_Deny',
        AdminGroup_InformRequester: 'Action-AdminGroup_InformRequester',
        AdminGroup_RequestSupervisor1: 'Action-AdminGroup_RequestSupervisor1',
        AdminGroup_RequestSupervisors: 'Action-AdminGroup_RequestSupervisors',
        AdminGroup_ApprovePermissionBachelorThesisRegistration: 'Action-AdminGroup_ApprovePermissionBachelorThesisRegistration',
        AdminGroup_ApprovePermissionOralDefenseRegistration: 'Action-AdminGroup_ApprovePermissionOralDefenseRegistration',
        AdminGroup_ApproveBachelorThesisRegistration: 'Action-AdminGroup_ApproveBachelorThesisRegistration',
        AdminGroup_RejectBachelorThesisRegistration: 'Action-AdminGroup_RejectBachelorThesisRegistration',
        AdminGroup_ConfirmBachelorThesisRegistration: 'Action-AdminGroup_ConfirmBachelorThesisRegistration',
        AdminGroup_ConfirmOralDefenseRegistration: 'Action-AdminGroup_ConfirmOralDefenseRegistration',
        AdminGroup_BackBachelorThesisRegistration: 'Action-AdminGroup_BackBachelorThesisRegistration',
        AdminGroup_BackOralDefenseRegistration: 'Action-AdminGroup_BackOralDefenseRegistration',

        Supervisor1_Approve: 'Action-Supervisor1_Approve',
        Supervisor1_Deny: 'Action-Supervisor1_Deny',
        Supervisor1_RejectThesis: 'Action-Supervisor1_RejectThesis',
        Supervisor1_RequestAdminGroup: 'Action-Supervisor1_RequestAdminGroup',
        Supervisor1_ApproveBachelorThesisRegistration: 'Action-Supervisor1_ApproveBachelorThesisRegistration',
        Supervisor1_ApproveBachelorThesisEvaluation: 'Action-Supervisor1_ApproveBachelorThesisEvaluation',
        Supervisor1_RejectBachelorThesisRegistration: 'Action-Supervisor1_RejectBachelorThesisRegistration',
        Supervisor1_ConfirmAssessments: 'Action-Supervisor1_ConfirmAssessments',
        Supervisor1_BackAssessments: 'Action-Supervisor1_BackAssessments',

        Supervisor2_Approve: 'Action-Supervisor2_Approve',
        Supervisor2_Reject: 'Action-Supervisor2_Reject',
        Supervisor2_ApproveBachelorThesisRegistration: 'Action-Supervisor2_ApproveBachelorThesisRegistration',
        Supervisor2_RejectBachelorThesisRegistration: 'Action-Supervisor2_RejectBachelorThesisRegistration',
        Supervisor2_ConfirmAssessments: 'Action-Supervisor2_ConfirmAssessments',
        Supervisor2_BackAssessments: 'Action-Supervisor2_BackAssessments',

        RequesterOrSupervisor1_InviteSupervisor2: 'Action-RequesterOrSupervisor1_InviteSupervisor2',
    },
    ActivityType: {
        Notify: 'ActivityType-Notify',
        SendEmail: 'ActivityType-SendEmail',
        AddStakeholders: 'ActivityType-AddStakeholders',
        AcceptStakeholders: 'ActivityType-AcceptStakeholders',
        RemoveStakeholders: 'ActivityType-RemoveStakeholders',
    },
    Activity: {
        Notify_Requester: 'Activity-Notify_Requester',
        Notify_Stakeholders: 'Activity-Notify_Stakeholders',
        Notify_AdminGroup: 'Activity-Notify_AdminGroup',

        SendEmail_Stakeholders: 'Activity-SendEmail_Stakeholders',
        SendEmail_Requester: 'Activity-SendEmail_Requester',

        AddStakeholders_Supervisor1: 'Activity-AddStakeholders_Supervisor1',
        AcceptStakeholders_Supervisor1: 'Activity-AcceptStakeholders_Supervisor1',
        RemoveStakeholders_Supervisor1: 'Activity-RemoveStakeholders_Supervisor1',

        AddStakeholders_Supervisor2: 'Activity-AddStakeholders_Supervisor2',
        AcceptStakeholders_Supervisor2: 'Activity-AcceptStakeholders_Supervisor2',
        RemoveStakeholders_Supervisor2: 'Activity-RemoveStakeholders_Supervisor2',
    }
} as const;

function seedWorkflow(prisma: PrismaClient) {
    return [
        ...seedProcessIndependentTables(prisma),
        ...seedThesisWorkflow(prisma),
        ...configThesisWorkflow(prisma),
    ]
}

function seedProcessIndependentTables(prisma: PrismaClient) {
    return [
        prisma.target.createMany({
            data: Object.values(Id.Target).map(id => createStaticType(id))
        }),
        prisma.stateType.createMany({
            data: Object.values(Id.StateType).map(id => createStaticType(id)),
        }),
        prisma.actionType.createMany({
            data: Object.values(Id.ActionType).map(id => createStaticType(id)),
        }),
        prisma.activityType.createMany({
            data: Object.values(Id.ActivityType).map(id => createStaticType(id)),
        })
    ];
}

const nonCancellableStateIds: NonRequestCancelledStateId[] = [
    Id.State.AdminApprovedCreateThesisRequest,
    Id.State.AdminDeniedCreateThesisRequest,
    Id.State.AdminDeniedPermissionToFillBTRRequest,
    Id.State.AdminDeniedApproveBTRFormRequest,
    Id.State.AdminDeniedPermissionToFillODRForm,
    Id.State.AdminConfirmedAssessments,

    Id.State.Sup1DeniedThesis,
    Id.State.Sup1ApprovedThesis,
    Id.State.Sup1SubmittedBTEForm,
    Id.State.StudentFillingODRForm,
    Id.State.StudentFilledODRForm,
    Id.State.RequestFinalizeODRFormSentToAdmin,
    Id.State.AdminFinalizedODRForm,
    Id.State.RequestAssessmentsSentToSups,
    Id.State.Sup1ConfirmedAssessmentsAwaitingSup2,
    Id.State.Sup2ConfirmedAssessmentsAwaitingSup1,
    Id.State.SupsConfirmedAssessments,
    Id.State.AssessmentsSentToAdmin,
];
const cancelRelatedTransitionOps = createInTransitionsForRequestCancelledState(nonCancellableStateIds);

function seedThesisWorkflow(prisma: PrismaClient) {
    return [
        prisma.process.create({
            data: {
                id: Id.Process.Thesis, 
                name: 'Thesis Process',
            }
        }),
        prisma.group.create({
            data: {
                id: Id.Group.Thesis_CSEAdmins,
                processId: Id.Process.Thesis,
                name: 'CSE Admins',
                users: {
                    connect: [
                        {
                            userId: '1',
                        },
                        {
                            userId: '2',
                        }
                    ]
                },
                programAdminGroup: {
                    create: {
                        programId: 1,
                    }
                }
            }
        }),
        prisma.group.create({
            data: {
                id: Id.Group.Thesis_MENAdmins,
                processId: Id.Process.Thesis,
                name: 'MEN Admins',
                users: {
                    connect: [
                        {
                            userId: '3',
                        },
                    ]
                },
                programAdminGroup: {
                    create: {
                        programId: 2,
                    }
                }
            }
        }),
        prisma.state.createMany({
            data: [
                {
                    id: Id.State.FindingThesis,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Initial,
                    name: 'Finding thesis',
                },
                {
                    id: Id.State.RequestCreateThesisSentToAdmin,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting admin response',
                },
                {
                    id: Id.State.AdminApprovedCreateThesisRequest,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Completed,
                    name: 'Admin approved create-thesis request',
                },
                {
                    id: Id.State.AdminDeniedCreateThesisRequest,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Denied,
                    name: 'Admin denied create-thesis request',
                },
                {
                    id: Id.State.ThesisApplied,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Thesis applied',
                },
                {
                    id: Id.State.RequestApplyThesisSentToSup1,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting supervisor 1\'s response to thesis application',
                },
                {
                    id: Id.State.Sup1ApprovedThesisApplication,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor 1 accepted thesis application',
                },
                {
                    id: Id.State.FindingSup2,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Finding supervisor 2 for thesis application',
                },
                {
                    id: Id.State.RequestApplyThesisSentToSup2,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting supervisor 2\'s response to thesis application',
                },
                {
                    id: Id.State.Sup2ApprovedThesisApplication,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor 2 accepted thesis application',
                },
                {
                    id: Id.State.RequestPermissionToFillBTRSentToAdmin,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting permission to fill bachelor thesis registration from admin',
                },
                {
                    id: Id.State.AdminDeniedPermissionToFillBTRRequest,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Denied,
                    name: 'Admin denied permission to fill bachelor thesis registration',
                },
                {
                    id: Id.State.StudentFillingBTRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting student filling bachelor thesis registration form',
                },
                {
                    id: Id.State.StudentFilledBTRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Student filled bachelor thesis registration form',
                },
                {
                    id: Id.State.RequestApproveBTRFormSentToSup1,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting approval on bachelor thesis registration form from supervisor 1',
                },
                {
                    id: Id.State.RequestApproveBTRFormSentToSup2,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting approval on bachelor thesis registration form from supervisor 2',
                },
                {
                    id: Id.State.RequestApproveBTRFormSentToAdmin,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting approval on bachelor thesis registration form from admin',
                },
                {
                    id: Id.State.AdminDeniedApproveBTRFormRequest,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Denied,
                    name: 'Admin denied approve-bachelor-thesis-registration-form request',
                },
                {
                    id: Id.State.AdminFillingBTRequirements,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Admin filling bachelor thesis requirements',
                },
                {
                    id: Id.State.AdminFilledBTRequirements,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Admin filled bachelor thesis requirements',
                },
                {
                    id: Id.State.BTRequirementsSentToStudent,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Bachelor thesis requirements sent to student',
                },
                {
                    id: Id.State.RequestBTEFormSentToSup1,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting approval on bachelor thesis from supervisor1',
                },
                {
                    id: Id.State.Sup1DeniedThesis,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor1 denied bachelor thesis',
                },
                {
                    id: Id.State.Sup1ApprovedThesis,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor1 approved bachelor thesis',
                },
                {
                    id: Id.State.Sup1SubmittedBTEForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting approval on filling oral defense registration form from admin',
                },
                {
                    id: Id.State.AdminDeniedPermissionToFillODRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Denied,
                    name: 'Admin denied permission to fill oral defense registration form',
                },
                {
                    id: Id.State.StudentFillingODRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Admin approved permission to fill oral defense registration form. '
                        + 'Awaiting student filling oral defense registration form',
                },
                {
                    id: Id.State.StudentFilledODRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Student filled oral defense registration form',
                },
                {
                    id: Id.State.RequestFinalizeODRFormSentToAdmin,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting finalization on oral defense registration form from admin',
                },
                {
                    id: Id.State.AdminFinalizedODRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Admin finalized oral defense registration form',
                },
                {
                    id: Id.State.ODRDetailSentToStudent,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Oral Defense Registration detail sent to student',
                },
                {
                    id: Id.State.RequestAssessmentsSentToSups,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting assessment for bachelor thesis and oral defense from supervisor1 and supervisor2',
                },
                {
                    id: Id.State.Sup1ConfirmedAssessmentsAwaitingSup2,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor1 completed assessment for bachelor thesis and oral defense. '
                        + 'Awaiting assessments from supervisor2',
                },
                {
                    id: Id.State.Sup2ConfirmedAssessmentsAwaitingSup1,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor2 completed assessment for bachelor thesis and oral defense. '
                        + 'Awaiting assessments from supervisor1',
                },
                {
                    id: Id.State.SupsConfirmedAssessments,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Supervisor1 and supervisor2 completed assessment for bachelor thesis and oral defense',
                },
                {
                    id: Id.State.AssessmentsSentToAdmin,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Awaiting confirmation on assessment for bachelor thesis and oral defense from admin',
                },
                {
                    id: Id.State.AdminConfirmedAssessments,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Completed,
                    name: 'Admin confirmed assessment for bachelor thesis and oral defense',
                },

                // Special state
                {
                    id: Id.State.RequestCancelled,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Cancelled,
                    name: 'Request cancelled by requester'
                }
            ]
        }),
        prisma.transition.createMany({
            data: [
                ...Object.values(Id.Transition).map(transitionId => creatTransition(transitionId)),
                ...cancelRelatedTransitionOps.createMany
            ],
        }),
        prisma.action.createMany({
            data: Object.values(Id.Action).map(actionId => createAction(actionId, Id.Process.Thesis)),
        }),
        prisma.activity.createMany({
            data: Object.values(Id.Activity).map(activityId => createActivity(activityId, Id.Process.Thesis)),
        }),
        prisma.actionTarget.createMany({
            data: Object.values(Id.Action).flatMap(actionId => createActionTarget(actionId)),
        }),
        prisma.activityTarget.createMany({
            data: Object.values(Id.Activity).flatMap(activityId => createActivityTarget(activityId)),
        }),
    ];
}

function configThesisWorkflow(prisma: PrismaClient) {
    return [
        /**
         * State
         */
        prisma.state.update({
            where: {
                id: Id.State.RequestCancelled,
            },
            data: {
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.Notify_AdminGroup },
                    ]
                }
            },
        }),
        /** 
         * Transition
         */
        ...cancelRelatedTransitionOps.updates.map(item => prisma.transition.update(item)),
        prisma.transition.update({
            where: {
                id: Id.Transition.FindingThesis_RequestCreateThesisSentToAdmin,
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_InformAdminGroup }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestCreateThesisSentToAdmin_AdminApprovedCreateThesisRequest,
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Approve }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Requester }
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestCreateThesisSentToAdmin_AdminDeniedCreateThesisRequest
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Deny }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Requester }
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.FindingThesis_ThesisApplied,
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_ApplyThesis }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.ThesisApplied_FindingThesis,
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_RejectThesis }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.ThesisApplied_RequestApplyThesisSentToSup1,
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_ConfirmThesis }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.AddStakeholders_Supervisor1 },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApplyThesisSentToSup1_FindingThesis
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_RejectThesis }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.RemoveStakeholders_Supervisor1 },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApplyThesisSentToSup1_Sup1ApprovedThesisApplication
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_Approve }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.AcceptStakeholders_Supervisor1 },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup1ApprovedThesisApplication_FindingSup2
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_Confirm }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.FindingSup2_RequestApplyThesisSentToSup2
            },
            data: {
                actions: {
                    connect: { id: Id.Action.RequesterOrSupervisor1_InviteSupervisor2 }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.AddStakeholders_Supervisor2 },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApplyThesisSentToSup2_FindingSup2
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_Reject }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.RemoveStakeholders_Supervisor2 },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApplyThesisSentToSup2_Sup2ApprovedThesisApplication
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_Approve }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.AcceptStakeholders_Supervisor2 },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup2ApprovedThesisApplication_RequestPermissionToFillBTRSentToAdmin
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_InformAdminGroup }
                },
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestPermissionToFillBTRSentToAdmin_AdminDeniedPermissionToFillBTRRequest
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Deny }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestPermissionToFillBTRSentToAdmin_StudentFillingBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_ApprovePermissionBachelorThesisRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFillingBTRForm_StudentFilledBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_ConfirmBachelorThesisRegistration }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFilledBTRForm_StudentFillingBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_BackBachelorThesisRegistration }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFilledBTRForm_RequestApproveBTRFormSentToSup1
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_RequestSupervisor1 }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToSup1_StudentFillingBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_RejectBachelorThesisRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToSup1_RequestApproveBTRFormSentToSup2
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_ApproveBachelorThesisRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToSup2_StudentFillingBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_RejectBachelorThesisRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToSup2_RequestApproveBTRFormSentToAdmin
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_ApproveBachelorThesisRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToAdmin_StudentFillingBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_RejectBachelorThesisRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToAdmin_AdminDeniedApproveBTRFormRequest
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Deny }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.SendEmail_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestApproveBTRFormSentToAdmin_AdminFillingBTRequirements
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Approve }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFillingBTRequirements_AdminFilledBTRequirements
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_ConfirmBachelorThesisRegistration }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFilledBTRequirements_AdminFillingBTRequirements
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_BackBachelorThesisRegistration }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFilledBTRequirements_BTRequirementsSentToStudent
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_InformRequester }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.SendEmail_Requester },
                    ]
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.BTRequirementsSentToStudent_RequestBTEFormSentToSup1
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_RequestSupervisor1 }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestBTEFormSentToSup1_Sup1DeniedThesis
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_Deny }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.SendEmail_Requester },
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestBTEFormSentToSup1_Sup1ApprovedThesis
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_ApproveBachelorThesisEvaluation }
                },
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup1ApprovedThesis_Sup1SubmittedBTEForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_RequestAdminGroup }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders }
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup1SubmittedBTEForm_AdminDeniedPermissionToFillODRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Deny }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.SendEmail_Requester },
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup1SubmittedBTEForm_StudentFillingODRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_ApprovePermissionOralDefenseRegistration }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.SendEmail_Requester },
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFillingODRForm_StudentFilledODRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_ConfirmOralDefenseRegistration }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFilledODRForm_StudentFillingODRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_BackOralDefenseRegistration }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFilledODRForm_RequestFinalizeODRFormSentToAdmin
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_RequestAdminGroup }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders }
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestFinalizeODRFormSentToAdmin_AdminFinalizedODRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_ConfirmOralDefenseRegistration }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFinalizedODRForm_RequestFinalizeODRFormSentToAdmin
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_BackOralDefenseRegistration }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFinalizedODRForm_ODRDetailSentToStudent
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_InformRequester }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                        { id: Id.Activity.SendEmail_Requester },
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.ODRDetailSentToStudent_RequestAssessmentsSentToSups
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_RequestSupervisors }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders },
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestAssessmentsSentToSups_Sup1ConfirmedAssessmentsAwaitingSup2
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_ConfirmAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.RequestAssessmentsSentToSups_Sup2ConfirmedAssessmentsAwaitingSup1
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_ConfirmAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup1ConfirmedAssessmentsAwaitingSup2_RequestAssessmentsSentToSups
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_BackAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup1ConfirmedAssessmentsAwaitingSup2_SupsConfirmedAssessments
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_ConfirmAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup2ConfirmedAssessmentsAwaitingSup1_RequestAssessmentsSentToSups
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_BackAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.Sup2ConfirmedAssessmentsAwaitingSup1_SupsConfirmedAssessments
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_ConfirmAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.SupsConfirmedAssessments_Sup1ConfirmedAssessmentsAwaitingSup2
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor2_BackAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.SupsConfirmedAssessments_Sup2ConfirmedAssessmentsAwaitingSup1
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_BackAssessments }
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.SupsConfirmedAssessments_AssessmentsSentToAdmin
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Supervisor1_RequestAdminGroup }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders }
                    ]
                }
            }
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AssessmentsSentToAdmin_AdminConfirmedAssessments
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Confirm }
                },
                activities: {
                    connect: [
                        { id: Id.Activity.Notify_Stakeholders }
                    ]
                }
            }
        }),
    ];
}

///////////////////////////////////////////////////////////////////////////////////
type ValueOf<T> = T[keyof T];
type StateId = ValueOf<typeof Id.State>;
type TransitionId = ValueOf<typeof Id.Transition>;
type ActionId = ValueOf<typeof Id.Action>;
type ActivityId = ValueOf<typeof Id.Activity>;
type NonRequestCancelledStateId = Exclude<StateId, typeof Id.State.RequestCancelled>;

const staticTypeIdRegex = /\w+-(\w+)/;
const transitionIdRegex = /Transition-(\w+)_(\w+)/;
const actionIdRegex = /Action-(\w+)_(\w+)/;
const activityIdRegex = /Activity-(\w+)_(\w+)/;

function createStaticType(staticTypeId: string) {
    const match = staticTypeId.match(staticTypeIdRegex);
    if (!match) {
        throw new Error(`Invalid static type ID: ${staticTypeId}`);
    }
    return {
        id: staticTypeId,
        name: PascalCaseToStandard(match[1], true),
    }
}

function creatTransition(transitionId: TransitionId) {
    const match = transitionId.match(transitionIdRegex);
    if (!match) {
        throw new Error(`Invalid transition ID: ${transitionId}`);
    }
    return {
        id: transitionId,
        currentStateId: `State-${match[1]}`,
        nextStateId: `State-${match[2]}`,
    }
}

function createAction(actionId: ActionId, processId: string) {
    const match = actionId.match(actionIdRegex);
    if (!match) {
        throw new Error(`Invalid action ID: ${actionId}`);
    }
    return {
        id: actionId,
        processId: processId,
        actionTypeId: `ActionType-${match[2]}`,
        name: `${PascalCaseToStandard(match[1])}: ${PascalCaseToStandard(match[2])}`,
    }
}

function createActivity(activityId: ActivityId, processId: string) {
    const match = activityId.match(activityIdRegex);
    if (!match) {
        throw new Error(`Invalid activity ID: ${activityId}`);
    }
    return {
        id: activityId,
        processId: processId,
        activityTypeId: `ActivityType-${match[1]}`,
        name: `${PascalCaseToStandard(match[1])}: ${PascalCaseToStandard(match[2])}`,
    }
}

function createActionTarget(actionId: ActionId) {
    const match = actionId.match(actionIdRegex);
    if (!match) {
        throw new Error(`Invalid action ID: ${actionId}`);
    }
    
    let targetId = `Target-${match[1]}`;

    const or = match[1].split('Or');
    if (or.length > 1) {
        return or.map(target => { return {
            id: `ActionTarget-${target}_${match[2]}`,
            actionId,
            targetId: `Target-${target}`,
        }});
    }
    else {
        return {
            id: `ActionTarget-${match[1]}_${match[2]}`,
            actionId,
            targetId,
        };
    }
}

function createActivityTarget(activityId: ActivityId) {
    const match = activityId.match(activityIdRegex);
    if (!match) {
        throw new Error(`Invalid activity ID: ${activityId}`);
    }

    let targetId = `Target-${match[2]}`;

    return {
        id: `ActivityTarget-${match[1]}_${match[2]}`,
        activityId,
        targetId,
    };
}

function createInTransitionsForRequestCancelledState(excludedStateIds: NonRequestCancelledStateId[]) {
    const STATE_PREFIX = 'State-';
    const fromStateIds = Object.values(Id.State).filter(item => 
            item !== Id.State.RequestCancelled
            && !excludedStateIds.find(stateId => stateId === item));

    const trimmedRequestCancelledStateId = trimPrefix(Id.State.RequestCancelled, STATE_PREFIX);
    
    const inTransitionsCreateMany = fromStateIds.map(fromStateId => {
        const trimmedFromStateId = trimPrefix(fromStateId, STATE_PREFIX);
        return {
            id: `Transition-${trimmedFromStateId}_${trimmedRequestCancelledStateId}`,
            currentStateId: fromStateId,
            nextStateId: Id.State.RequestCancelled
        }
    });

    const inTransitionUpdates = inTransitionsCreateMany.map(item => {
        return {
            where: {
                id: item.id
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_Cancel }
                },
            }
        }
    });

    return {
        createMany: inTransitionsCreateMany,
        updates: inTransitionUpdates,
    };
}