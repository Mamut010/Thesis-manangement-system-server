import { ValueOf } from "../../../../utils/types";

export const StateType = {
    Initial: 'Initial',
    Normal: 'Normal',
    Completed: 'Completed',
    Denied: 'Denied',
    Cancelled: 'Cancelled',
} as const;

export type StateType = ValueOf<typeof StateType>;