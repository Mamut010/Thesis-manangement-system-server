import { ValueOf } from "../../utils/types";

export const LoggingLevel = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
} as const;

export type LoggingLevel = ValueOf<typeof LoggingLevel>;