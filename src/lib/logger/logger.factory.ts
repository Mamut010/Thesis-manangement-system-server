import { LoggerInterface } from "./logger.interface";
import { Logger } from "./logger";

export type LoggerFactory = (scope?: string) => LoggerInterface;

export const DefaultLoggerFactory: LoggerFactory = (scope?: string): LoggerInterface => {
    return new Logger(scope);
}