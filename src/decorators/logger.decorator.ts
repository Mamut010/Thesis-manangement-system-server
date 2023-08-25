/**
 * @see https://stackoverflow.com/questions/65402497/tsyringe-container-resolve-creates-a-new-instance-on-call-in-custom-decorator
 */

import { inject } from 'inversify';
import { container } from '../core/bootstrappers';
import { INJECTION_TOKENS } from '../core/constants/injection-tokens';
import { LoggerFactory, LoggerInterface } from '../lib/logger';

function getServiceIdentifier(scope?: string) {
    return `LoggerFactory(${scope})`;
}

/**
 * Inject an instance of LoggerInterface using LoggerFactory with the provided scope.
 * Can be used as a property decorator as well as a parameter decorator.
 *
 * @param scope Scope of the injected logger.
 */
export const logger = (scope?: string) => {
    const serviceIdentifier = getServiceIdentifier(scope);

    if (!container.isBound(serviceIdentifier)) {
        container
            .bind<LoggerInterface>(serviceIdentifier)
            .toDynamicValue((context) => {
                const loggerFactory: LoggerFactory = context.container.get(INJECTION_TOKENS.LoggerFactory);
                return loggerFactory(scope)
            })
            .inRequestScope();
    }

    return inject(serviceIdentifier);
}