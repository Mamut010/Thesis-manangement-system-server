import { ValueOf } from "../../../../utils/types";

export const ActivityType = {
    Notify: 'Notify',
    SendEmail: 'Send Email',
    AddStakeholders: 'Add Stakeholders',
} as const;

export type ActivityType = ValueOf<typeof ActivityType>;