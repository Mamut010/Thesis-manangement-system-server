/**
 * Cre: https://github.com/w3tecch/express-typescript-boilerplate
 */

import * as path from 'path';
import * as winston from 'winston';
import { LoggingLevel } from './logging-level';

export class Logger {

    public static DEFAULT_SCOPE = 'app';

    private static parsePathToScope(filepath: string): string {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '');
            filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
            filepath = filepath.replace('.ts', '');
            filepath = filepath.replace('.js', '');
            filepath = filepath.replace(path.sep, ':');
        }
        return filepath;
    }

    constructor(private scope?: string) {
        this.scope = Logger.parsePathToScope(scope ?? Logger.DEFAULT_SCOPE);
    }

    public debug(message: string, ...args: any[]): void {
        this.log(LoggingLevel.DEBUG, message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log(LoggingLevel.INFO, message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log(LoggingLevel.WARN, message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log(LoggingLevel.ERROR, message, args);
    }

    private log(level: LoggingLevel, message: string, args: any[]): void {
        if (winston) {
            winston[level](`${this.formatScope()} ${message}`, args);
        }
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }

}