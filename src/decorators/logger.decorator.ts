/**
 * @see https://stackoverflow.com/questions/65402497/tsyringe-container-resolve-creates-a-new-instance-on-call-in-custom-decorator
 */

import { inject } from 'inversify';
import { container } from '../core/bootstrappers';
import { INJECTION_TOKENS } from '../core/constants/injection-tokens';
import { LoggerFactory, LoggerInterface } from '../lib/logger';

const loggerCache = new Map<string, LoggerInterface>();

function getLoggerFactory(): LoggerFactory {
    return container.get(INJECTION_TOKENS.LoggerFactory);
}

function getServiceIdentifier(scope?: string) {
    return `LoggerFactory(${scope})`;
}

function cacheOrCreateNew(loggerFactory: LoggerFactory, scope?: string): LoggerInterface {
    const isScoped = typeof scope !== 'undefined';

    if (isScoped && loggerCache.has(scope)) {
        return loggerCache.get(scope)!;
    }
    else {
        const logger = loggerFactory(scope);
        if (isScoped) {
            loggerCache.set(scope, logger);
        }

        return logger;
    }
}

/**
 * Inject an instance of LoggerInterface using LoggerFactory with the provided scope.
 * If used as a PropertyDecorator, the logger is eager loaded.
 * If used as a ParameterDecorator, the logger is lazy loaded.
 *
 * @param scope Scope of the injected logger.
 */
export const logger = (scope?: string) => {
    return (target: Object, targetKey?: string | symbol | undefined, index?: number | undefined): void => {
        if (typeof targetKey !== 'undefined') {
            return createPropertyDecorator(target, targetKey, scope);
        }
        else {
            return createParameterDecorator(target, targetKey, index, scope);
        }
    }
}

function createPropertyDecorator(target: Object, propertyKey: string | symbol, scope?: string): void {
    if (!Reflect.deleteProperty(target, propertyKey)) {
        throw new Error(`Could not delete property ${String(propertyKey)} in class ${target.constructor?.name}`);
    }

    const options: PropertyDescriptor = {
        value: cacheOrCreateNew(getLoggerFactory(), scope)
    };

    if (!Reflect.defineProperty(target, propertyKey, options)) {
        throw new Error(`Could not define ${String(propertyKey)} property in class ${target.constructor}`);
    }
}

function createParameterDecorator(target: Object, targetKey: string | symbol | undefined, 
    index: number | undefined, scope?: string): void {

    const serviceIdentifier = getServiceIdentifier(scope);

    if (!container.isCurrentBound(serviceIdentifier)) {
        container
            .bind<LoggerInterface>(serviceIdentifier)
            .toDynamicValue((_) => getLoggerFactory()(scope))
            .inRequestScope();
    }

    inject(serviceIdentifier)(target, targetKey, index);
}