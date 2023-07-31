"use strict";
/**
 * @Cre: https://github.com/w3tecch/express-typescript-boilerplate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
const path = tslib_1.__importStar(require("path"));
const env_1 = require("./lib/env");
const object_helpers_1 = require("./utils/object-helpers");
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });
/**
 * Environment variables
 */
const env = {
    node: process.env.NODE_ENV ?? 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    secrets: {
        accessToken: (0, env_1.getOsEnv)('ACCESS_TOKEN_SECRET'),
        refreshToken: (0, env_1.getOsEnv)('REFRESH_TOKEN_SECRET')
    },
    app: {
        name: (0, env_1.getOsEnv)('APP_NAME'),
        version: (0, env_1.getOsEnv)('APP_VERSION'),
        host: (0, env_1.getOsEnv)('APP_HOST'),
        schema: (0, env_1.getOsEnv)('APP_SCHEMA'),
        banner: (0, env_1.toBool)((0, env_1.getOsEnv)('APP_BANNER')),
        servers: {
            api: {
                routePrefix: (0, env_1.getOsEnv)('API_ROUTE_PREFIX'),
                port: (0, env_1.normalizePort)(process.env.APP_API_PORT ?? (0, env_1.getOsEnv)('API_PORT')),
                dirs: {
                    controllers: (0, env_1.getOsPaths)('API_CONTROLLERS'),
                    middlewares: (0, env_1.getOsPaths)('API_MIDDLEWARES'),
                    interceptors: (0, env_1.getOsPaths)('API_INTERCEPTORS'),
                },
            },
            auth: {
                routePrefix: (0, env_1.getOsEnv)('AUTH_ROUTE_PREFIX'),
                port: (0, env_1.normalizePort)(process.env.APP_AUTH_PORT ?? (0, env_1.getOsEnv)('AUTH_PORT')),
                dirs: {
                    controllers: (0, env_1.getOsPaths)('AUTH_CONTROLLERS'),
                    middlewares: (0, env_1.getOsPaths)('AUTH_MIDDLEWARES'),
                    interceptors: (0, env_1.getOsPaths)('AUTH_INTERCEPTORS'),
                },
            },
        },
        shared: {
            dirs: {
                middlewares: (0, env_1.getOsPaths)('SHARED_MIDDLEWARES'),
                interceptors: (0, env_1.getOsPaths)('SHARED_INTERCEPTORS'),
            },
        },
        socket: {
            port: (0, env_1.normalizePort)(process.env.APP_SOCKET_PORT ?? (0, env_1.getOsEnv)('SOCKET_PORT')),
        }
    },
    log: {
        level: (0, env_1.getOsEnv)('LOG_LEVEL'),
        json: (0, env_1.toBool)((0, env_1.getOsEnvOptional)('LOG_JSON')),
        output: (0, env_1.getOsEnv)('LOG_OUTPUT'),
    },
    db: {
        type: (0, env_1.getOsEnv)('DATABASE_CONNECTION'),
        host: (0, env_1.getOsEnvOptional)('DATABASE_HOST'),
        port: (0, env_1.toNumber)((0, env_1.getOsEnvOptional)('DATABASE_PORT')),
        username: (0, env_1.getOsEnvOptional)('DATABASE_USERNAME'),
        password: (0, env_1.getOsEnvOptional)('DATABASE_PASSWORD'),
        schema: (0, env_1.getOsEnv)('DATABASE_SCHEMA')
    },
    swagger: {
        enabled: (0, env_1.toBool)((0, env_1.getOsEnv)('SWAGGER_ENABLED')),
        route: (0, env_1.getOsEnv)('SWAGGER_ROUTE'),
        username: (0, env_1.getOsEnv)('SWAGGER_USERNAME'),
        password: (0, env_1.getOsEnv)('SWAGGER_PASSWORD'),
    },
};
exports.env = env;
(0, object_helpers_1.makeImmutable)(env);
//# sourceMappingURL=env.js.map