"use strict";
/**
 * @see https://stackoverflow.com/questions/65402497/tsyringe-container-resolve-creates-a-new-instance-on-call-in-custom-decorator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const inversify_1 = require("inversify");
const bootstrappers_1 = require("../core/bootstrappers");
const injection_tokens_1 = require("../core/constants/injection-tokens");
const loggerCache = new Map();
function getLoggerFactory() {
    return bootstrappers_1.container.get(injection_tokens_1.INJECTION_TOKENS.LoggerFactory);
}
function getServiceIdentifier(scope) {
    return `LoggerFactory(${scope})`;
}
function cacheOrCreateNew(loggerFactory, scope) {
    const isScoped = typeof scope !== 'undefined';
    if (isScoped && loggerCache.has(scope)) {
        return loggerCache.get(scope);
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
const logger = (scope) => {
    return (target, targetKey, index) => {
        if (typeof targetKey !== 'undefined') {
            return createPropertyDecorator(target, targetKey, scope);
        }
        else {
            return createParameterDecorator(target, targetKey, index, scope);
        }
    };
};
exports.logger = logger;
function createPropertyDecorator(target, propertyKey, scope) {
    if (!Reflect.deleteProperty(target, propertyKey)) {
        throw new Error(`Could not delete property ${String(propertyKey)} in class ${target.constructor?.name}`);
    }
    const options = {
        value: cacheOrCreateNew(getLoggerFactory(), scope)
    };
    if (!Reflect.defineProperty(target, propertyKey, options)) {
        throw new Error(`Could not define ${String(propertyKey)} property in class ${target.constructor}`);
    }
}
function createParameterDecorator(target, targetKey, index, scope) {
    const serviceIdentifier = getServiceIdentifier(scope);
    if (!bootstrappers_1.container.isCurrentBound(serviceIdentifier)) {
        bootstrappers_1.container
            .bind(serviceIdentifier)
            .toDynamicValue((_) => getLoggerFactory()(scope))
            .inRequestScope();
    }
    (0, inversify_1.inject)(serviceIdentifier)(target, targetKey, index);
}
//# sourceMappingURL=logger.decorator.js.map