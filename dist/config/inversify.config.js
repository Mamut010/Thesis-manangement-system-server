"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configInversify = void 0;
const logger_1 = require("../lib/logger");
const injection_tokens_1 = require("../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const services_1 = require("../auth/services");
const jwt_extractors_1 = require("../auth/utils/jwt-extractors");
const jwt_cookie_handlers_1 = require("../auth/utils/jwt-cookie-handlers");
const services_2 = require("../api/services");
const repositories_1 = require("../shared/repositories");
const configInversify = (container, settings) => {
    configConstants(container, settings);
    configLogger(container, settings);
    configPrisma(container, settings);
    configRepos(container, settings);
    configServices(container, settings);
    configUtils(container, settings);
};
exports.configInversify = configInversify;
function configConstants(container, settings) {
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.DiContainer)
        .toConstantValue(container);
}
function configLogger(container, settings) {
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.Logger)
        .toDynamicValue((context) => (settings?.getData('logger') ?? new logger_1.Logger()))
        .inSingletonScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.LoggerFactory)
        .toFactory((context) => {
        return (scope) => {
            if (typeof scope !== 'undefined') {
                return (0, logger_1.DefaultLoggerFactory)(scope);
            }
            else {
                const logger = context.container.get(injection_tokens_1.INJECTION_TOKENS.Logger);
                return logger;
            }
        };
    });
}
function configPrisma(container, settings) {
    /**
     * Prisma manages the connection pool automatically so it is better to let it live alongside the Express app
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
     */
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.Prisma)
        .toDynamicValue((context) => new client_1.PrismaClient())
        .inSingletonScope();
}
function configRepos(container, settings) {
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.UserRepo)
        .to(repositories_1.UserRepo)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.RefreshTokenRepo)
        .to(repositories_1.RefreshTokenRepo)
        .inRequestScope();
}
function configServices(container, settings) {
    /**
     * Auth Server's Services
     */
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.JwtService)
        .to(services_1.JwtService)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.HashService)
        .to(services_1.HashService)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.AuthService)
        .to(services_1.AuthService)
        .inRequestScope();
    /**
     * REST Server's Services
     */
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.PlainTransformer)
        .to(services_2.PlainTransformerService)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.AdminService)
        .to(services_2.AdminService)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.AdminStudentService)
        .to(services_2.AdminStudentService)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.AdminLecturerService)
        .to(services_2.AdminLecturerService)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.AdminThesisService)
        .to(services_2.AdminThesisService)
        .inRequestScope();
}
function configUtils(container, settings) {
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.JwtExtractor)
        .to(jwt_extractors_1.AuthHeaderJwtExtractor)
        .inRequestScope();
    container
        .bind(injection_tokens_1.INJECTION_TOKENS.JwtCookieHandler)
        .to(jwt_cookie_handlers_1.JwtCookieHandler)
        .inRequestScope();
}
//# sourceMappingURL=inversify.config.js.map