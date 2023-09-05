import { ValueOf } from "../../../../utils/types";

export const Target = {
    Requester: 'Requester',
    Supervisor1: 'Supervisor1',
    Supervisor2: 'Supervisor2',
    Stakeholders: 'Stakeholders',
    AdminGroup: 'Admin Group',
} as const;

export type Target = ValueOf<typeof Target>;