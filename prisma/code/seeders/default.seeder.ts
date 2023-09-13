import { PrismaClient } from "@prisma/client";
import { Seeder } from "./seeder";
import { ROLES, ROLE_IDS } from "../roles";
import { hash } from "../utils/crypto";
import { email } from "../utils/credentials";

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
            ]
        }),
        prisma.admin.createMany({
            data: [
                { userId: '1', title: 'CSE Program', contact: 'ABC City' },
                { userId: '2', title: 'Mr. Fred', contact: 'HCM City' },
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
                { userId: '10001', programId: 1, intake: 2019, surname: 'Doe', forename: 'John' },
                { userId: '10002', programId: 1, intake: 2019, surname: 'Doe', forename: 'Jane' },
                { userId: '10003', programId: 2, intake: 2021, surname: 'Doe', forename: 'Mary' },
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
        prisma.bachelorThesisRegistration.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401', adminId: '1',
                    furtherParticipants: 'Jane Doe', 
                    supervisor1Confirmed: true
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401', adminId: '1',
                    furtherParticipants: 'John Doe',
                    supervisor1Confirmed: true, supervisor2Confirmed: false
                },
            ]
        }),
        prisma.oralDefenseRegistration.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401' 
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401' 
                },
            ]
        }),
        prisma.bachelorThesisAssessment.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401',
                    furtherParticipants: 'Jane Doe', 
                    supervisor1Grade: 1, supervisor2Grade: 1,
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401',
                    furtherParticipants: 'John Doe',
                    supervisor1Grade: 1, supervisor2Grade: 1,
                }
            ]
        }),
        prisma.oralDefenseAssessment.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401' 
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401' 
                },
            ]
        }),
        prisma.bachelorThesisEvaluation.createMany({
            data: [
                {
                    thesisId: 1, studentId: '10001', supervisorId: '101',
                    title: 'Mr', date: new Date(), supervisorConfirmed: true
                },
                {
                    thesisId: 2, studentId: '10002', supervisorId: '401',
                    title: 'Ms'
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
        AdminRejectedPermissionToFillBTRRequest: 'State-AdminRejectedPermissionToFillBTRRequest',
        AdminDeniedPermissionToFillBTRRequest: 'State-AdminDeniedPermissionToFillBTRRequest',
        StudentFillingBTRForm: 'State-StudentFillingBTRForm',
        StudentFilledBTRForm:'State-StudentFilledBTRForm',
        RequestApproveBTRFormSentToSup1: 'State-RequestApproveBTRFormSentToSup1',
        RequestApproveBTRFormSentToSup2: 'State-RequestApproveBTRFormSentToSup2',
        RequestApproveBTRFormSentToAdmin: 'State-RequestApproveBTRFormSentToAdmin',
        AdminDeniedApproveBTRFormRequest: 'State-AdminDeniedApproveBTRFormRequest',
        AdminFillingBTRequirements: 'State-AdminFillingBTRequirements',
        AdminFilledBTRequirements: 'State-AdminFilledBTRequirements',
        SentBTRequirementsToStudent: 'State-SentBTRequirementsToStudent',
        // Special state
        RequestCancelled: 'State-RequestCancelled'
    },
    Transition: {
        FindingThesis_RequestCreateThesisSentToAdmin: 'Transition-FindingThesis_RequestCreateThesisSentToAdmin',
        RequestCreateThesisSentToAdmin_AdminApprovedCreateThesisRequest: 'Transition-RequestCreateThesisSentToAdmin_AdminApprovedCreateThesisRequest',
        RequestCreateThesisSentToAdmin_AdminDeniedCreateThesisRequest: 'Transition-RequestCreateThesisSentToAdmin_AdminDeniedCreateThesisRequest',
        FindingThesis_ThesisApplied: 'Transition-FindingThesis_ThesisApplied',
        ThesisApplied_FindingThesis: 'Transition-ThesisApplied_FindingThesis',
        // ThesisApplied_FindingSup1: 'Transition-ThesisApplied_FindingSup1',
        // FindingSup1_SentFindingSup1ToAdmin: 'Transition-FindingSup1_SentFindingSup1ToAdmin',
        // FindingSup1_RequestApplyThesisSentToSup1: 'Transition-FindingSup1_RequestApplyThesisSentToSup1',
        // FindingSup1_RequestApplyThesisSentToSup1: 'Transition-FindingSup1_RequestApplyThesisSentToSup1',
        // RequestApplyThesisSentToSup1_FindingSup1: 'Transition-RequestApplyThesisSentToSup1_FindingSup1',
        ThesisApplied_RequestApplyThesisSentToSup1: 'Transition-ThesisApplied_RequestApplyThesisSentToSup1',
        RequestApplyThesisSentToSup1_FindingThesis: 'Transition-RequestApplyThesisSentToSup1_FindingThesis',
        RequestApplyThesisSentToSup1_Sup1ApprovedThesisApplication: 'Transition-RequestApplyThesisSentToSup1_Sup1ApprovedThesisApplication',
        Sup1ApprovedThesisApplication_FindingSup2: 'Transition-Sup1ApprovedThesisApplication_FindingSup2',
        FindingSup2_RequestApplyThesisSentToSup2: 'Transition-FindingSup2_RequestApplyThesisSentToSup2',
        RequestApplyThesisSentToSup2_FindingSup2: 'Transition-RequestApplyThesisSentToSup2_FindingSup2',
        RequestApplyThesisSentToSup2_Sup2ApprovedThesisApplication: 'Transition-RequestApplyThesisSentToSup2_Sup2ApprovedThesisApplication',
        Sup2ApprovedThesisApplication_RequestPermissionToFillBTRSentToAdmin: 'Transition-Sup2ApprovedThesisApplication_RequestPermissionToFillBTRSentToAdmin',
        RequestPermissionToFillBTRSentToAdmin_AdminRejectedPermissionToFillBTRRequest: 'Transition-RequestPermissionToFillBTRSentToAdmin_AdminRejectedPermissionToFillBTRRequest',
        AdminRejectedPermissionToFillBTRRequest_RequestPermissionToFillBTRSentToAdmin: 'Transition-AdminRejectedPermissionToFillBTRRequest_RequestPermissionToFillBTRSentToAdmin',
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
        AdminFilledBTRequirements_SentBTRequirementsToStudent: 'Transition-AdminFilledBTRequirements_SentBTRequirementsToStudent',
    },
    ActionType: {
        Approve: 'ActionType-Approve',
        ApplyThesis: 'ActionType-ApplyThesis',
        Reject: 'ActionType-Reject',
        RejectThesis: 'ActionType-RejectThesis',
        Confirm: 'ActionType-Confirm',
        ConfirmThesis: 'ActionType-ConfirmThesis',
        RequestAdminGroup: 'ActionType-RequestAdminGroup',
        RequestSupervisor1: 'ActionType-RequestSupervisor1',
        RequestSupervisor2: 'ActionType-RequestSupervisor2',
        InformAdminGroup: 'ActionType-InformAdminGroup',
        InformRequester: 'ActionType-InformRequester',
        InviteSupervisor2: 'ActionType-InviteSupervisor2',
        Deny: 'ActionType-Deny',
        Cancel: 'ActionType-Cancel',
    },
    Action: {
        Requester_ApplyThesis: 'Action-Requester_ApplyThesis',
        Requester_Reject: 'Action-Requester_Reject',
        Requester_RejectThesis: 'Action-Requester_RejectThesis',
        Requester_RequestAdminGroup: 'Action-Requester_RequestAdminGroup',
        Requester_RequestSupervisor1: 'Action-Requester_RequestSupervisor1',
        Requester_Confirm: 'Action-Requester_Confirm',
        Requester_ConfirmThesis: 'Action-Requester_ConfirmThesis',
        Requester_InformAdminGroup: 'Action-Requester_InformAdminGroup',
        Requester_Cancel: 'Action-Requester_Cancel',

        AdminGroup_Approve: 'Action-AdminGroup_Approve',
        AdminGroup_Reject: 'Action-AdminGroup_Reject',
        AdminGroup_Confirm: 'Action-AdminGroup_Confirm',
        AdminGroup_InformRequester: 'Action-AdminGroup_InformRequester',
        AdminGroup_Deny: 'Action-AdminGroup_Deny',

        Supervisor1_Approve: 'Action-Supervisor1_Approve',
        Supervisor1_Reject: 'Action-Supervisor1_Reject',

        Supervisor2_Approve: 'Action-Supervisor2_Approve',
        Supervisor2_Reject: 'Action-Supervisor2_Reject',

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

function seedThesisWorkflow(prisma: PrismaClient) {
    return [
        prisma.process.create({
            data: {
                id: Id.Process.Thesis, 
                name: 'Thesis process',
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
                    id: Id.State.AdminRejectedPermissionToFillBTRRequest,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Denied,
                    name: 'Admin rejected permission-to-fill-bachelor-thesis-registration request',
                },
                {
                    id: Id.State.AdminDeniedPermissionToFillBTRRequest,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Denied,
                    name: 'Admin denied permission-to-fill-bachelor-thesis-registration request',
                },
                {
                    id: Id.State.StudentFillingBTRForm,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Normal,
                    name: 'Student filling bachelor thesis registration form',
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
                    id: Id.State.SentBTRequirementsToStudent,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Completed,
                    name: 'Bachelor thesis requirements sent to student'
                },
                // Special state
                {
                    id: Id.State.RequestCancelled,
                    processId: Id.Process.Thesis,
                    stateTypeId: Id.StateType.Cancelled,
                    name: 'Request cancelled'
                }
            ]
        }),
        prisma.transition.createMany({
            data: Object.values(Id.Transition).map(transitionId => creatTransition(transitionId, Id.Process.Thesis)),
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
        // Config special state (This state should be implicitly reachable from all other states)
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
                    connect: { id: Id.Action.Supervisor1_Reject }
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
                id: Id.Transition.RequestPermissionToFillBTRSentToAdmin_AdminRejectedPermissionToFillBTRRequest
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Reject }
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
                id: Id.Transition.AdminRejectedPermissionToFillBTRRequest_RequestPermissionToFillBTRSentToAdmin
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
                id: Id.Transition.StudentFillingBTRForm_StudentFilledBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_Confirm }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.StudentFilledBTRForm_StudentFillingBTRForm
            },
            data: {
                actions: {
                    connect: { id: Id.Action.Requester_Reject }
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
                    connect: { id: Id.Action.Supervisor1_Reject }
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
                    connect: { id: Id.Action.Supervisor1_Approve }
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
                    connect: { id: Id.Action.Supervisor2_Reject }
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
                    connect: { id: Id.Action.Supervisor2_Approve }
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
                    connect: { id: Id.Action.AdminGroup_Reject }
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
                    connect: { id: Id.Action.AdminGroup_Confirm }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFilledBTRequirements_AdminFillingBTRequirements
            },
            data: {
                actions: {
                    connect: { id: Id.Action.AdminGroup_Reject }
                }
            },
        }),
        prisma.transition.update({
            where: {
                id: Id.Transition.AdminFilledBTRequirements_SentBTRequirementsToStudent
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
    ];
}

///////////////////////////////////////////////////////////////////////////////////
function PascalCaseToStandard(pascalCaseStr: string, capitalizeEachWord: boolean = false) {
    return Array.from(pascalCaseStr).reduce((name, char, index) => {
        const isUpperCaseLetter = char === char.toUpperCase() && isNaN(+char);
        if (!capitalizeEachWord && index !== 0) {
            char = char.toLowerCase();
        }
        name += isUpperCaseLetter && index !== 0 ? ` ${char}` : char
        return name;
    }, '');
}

type ValueOf<T> = T[keyof T];
const staticTypeIdRegex = /\w+-(\w+)/;
function createStaticType(staticTypeId: string) {
    const match = staticTypeId.match(staticTypeIdRegex);
    if (!match) {
        throw new Error('Invalid static type ID');
    }
    return {
        id: staticTypeId,
        name: PascalCaseToStandard(match[1], true),
    }
}

const transitionIdRegex = /Transition-(\w+)_(\w+)/;
function creatTransition(transitionId: ValueOf<typeof Id.Transition>, processId: string) {
    const match = transitionId.match(transitionIdRegex);
    if (!match) {
        throw new Error(`Invalid transition ID: ${transitionId}`);
    }
    return {
        id: transitionId,
        processId: processId,
        currentStateId: `State-${match[1]}`,
        nextStateId: `State-${match[2]}`,
    }
}

const actionIdRegex = /Action-(\w+)_(\w+)/;
function createAction(actionId: ValueOf<typeof Id.Action>, processId: string) {
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

const activityIdRegex = /Activity-(\w+)_(\w+)/;
function createActivity(activityId: ValueOf<typeof Id.Activity>, processId: string) {
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

function createActionTarget(actionId: ValueOf<typeof Id.Action>) {
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

function createActivityTarget(activityId: ValueOf<typeof Id.Activity>) {
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