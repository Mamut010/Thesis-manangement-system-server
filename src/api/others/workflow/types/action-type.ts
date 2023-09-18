import { ValueOf } from "../../../../utils/types";

const VariantActionType = {
    ApplyThesis: 'Apply Thesis',
    RejectThesis: 'Reject Thesis',
    ConfirmThesis: 'Confirm Thesis',

    ApprovePermissionBachelorThesisRegistration: 'Approve Permission Bachelor Thesis Registration',
    ApprovePermissionOralDefenseRegistration: 'Approve Permission Oral Defense Registration',

    RejectBachelorThesisRegistration: 'Reject Bachelor Thesis Registration',
    ApproveBachelorThesisRegistration: 'Approve Bachelor Thesis Registration',
    ApproveBachelorThesisEvaluation: 'Approve Bachelor Thesis Evaluation',

    BackBachelorThesisRegistration: 'Back Bachelor Thesis Registration',
    BackOralDefenseRegistration: 'Back Oral Defense Registration',
    BackAssessments: 'Back Assessments',
    ConfirmBachelorThesisRegistration: 'Confirm Bachelor Thesis Registration',
    ConfirmOralDefenseRegistration: 'Confirm Oral Defense Registration',
    ConfirmAssessments: 'Confirm Assessments',
} as const;

export const ActionType = {
    ...VariantActionType,
    Approve: 'Approve',
    Back: 'Back',
    Cancel: 'Cancel',
    Confirm: 'Confirm',
    ConfirmThesis: 'Confirm Thesis',
    Deny: 'Deny',
    InformAdminGroup: 'Inform Admin Group',
    InformRequester: 'Inform Requester',
    InviteSupervisor2: 'Invite Supervisor2',
    Reject: 'Reject',
    RejectThesis: 'Reject Thesis',
    RequestAdminGroup: 'Request Admin Group',
    RequestSupervisor1: 'Request Supervisor1',
    RequestSupervisor2: 'Request Supervisor2',
    RequestSupervisors: 'Request Supervisors',
} as const;

export type ActionType = ValueOf<typeof ActionType>;