import { ValueOf } from "../../../../utils/types";

export const ActionType = {
    ApplyThesis: 'Apply Thesis',
    Approve: 'Approve',
    Cancel: 'Cancel',
    Confirm: 'Confirm',
    Deny: 'Deny',
    InformAdminGroup: 'Inform Admin Group',
    InformRequester: 'Inform Requester',
    Reject: 'Reject',
    RejectThesis: 'Reject Thesis',
    RequestAdminGroup: 'Request Admin Group',
    RequestSupervisor1: 'Request Supervisor1',
    RequestSupervisor2: 'Request Supervisor2',
} as const;

export type ActionType = ValueOf<typeof ActionType>;