import { ValueOf } from "../../../../utils/types";

export const ActionType = {
    ApplyThesis: 'Apply Thesis',
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