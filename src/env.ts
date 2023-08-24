/**
 * @Cre: https://github.com/w3tecch/express-typescript-boilerplate
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import {
    getOsEnv, getOsEnvArray, getOsEnvOptional, getOsPaths, normalizePort, toBool, toNumber
} from './lib/env';
import { get } from 'http';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV ?? 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: getOsEnv('APP_VERSION'),
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        banner: toBool(getOsEnv('APP_BANNER')),
        servers: {
            api: {
                routePrefix: getOsEnv('API_ROUTE_PREFIX'),
                port: normalizePort(process.env.APP_API_PORT ?? getOsEnv('API_PORT')) as number,
                dirs: {
                    controllers: getOsPaths('API_CONTROLLERS'),
                    middlewares: getOsPaths('API_MIDDLEWARES'),
                    interceptors: getOsPaths('API_INTERCEPTORS'),
                },
            },
            auth: {
                routePrefix: getOsEnv('AUTH_ROUTE_PREFIX'),
                port: normalizePort(process.env.APP_AUTH_PORT ?? getOsEnv('AUTH_PORT')) as number,
                dirs: {
                    controllers: getOsPaths('AUTH_CONTROLLERS'),
                    middlewares: getOsPaths('AUTH_MIDDLEWARES'),
                    interceptors: getOsPaths('AUTH_INTERCEPTORS'),
                },
            },
            ws: {
                dirs: {
                    controllers: getOsPaths('WS_CONTROLLERS'),
                    middlewares: getOsPaths('WS_MIDDLEWARES'),
                },
            }
        },
        shared: {
            dirs: {
                middlewares: getOsPaths('SHARED_MIDDLEWARES'),
                interceptors: getOsPaths('SHARED_INTERCEPTORS'),
            },
        },
    },
    auth: {
        accessToken: getOsEnv('ACCESS_TOKEN_SECRET'),
        refreshToken: getOsEnv('REFRESH_TOKEN_SECRET'),
        cookieSecret: getOsEnv('COOKIE_SECRET'),
        cipherSecret: getOsEnv('CIPHER_SECRET'),
    },
    cors: {
        allowOrigins: getOsEnvArray('ALLOW_ORIGINS')
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        type: getOsEnv('DATABASE_CONNECTION'),
        host: getOsEnvOptional('DATABASE_HOST'),
        port: toNumber(getOsEnvOptional('DATABASE_PORT')),
        username: getOsEnvOptional('DATABASE_USERNAME'),
        password: getOsEnvOptional('DATABASE_PASSWORD'),
        schema: getOsEnv('DATABASE_SCHEMA')
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    },
    mail: {
        secured: toBool(getOsEnvOptional('MAIL_SECURED')),
        service: getOsEnv('MAIL_SERVICE'),
        user: getOsEnv('MAIL_USER'),
        pass: getOsEnv('MAIL_PASS'),
    },
    socketAdminUI: {
        enabled: toBool(getOsEnv('SOCKET_ADMIN_ENABLED')),
        url: getOsEnv('SOCKET_ADMIN_URL'),
        nsp: getOsEnv('SOCKET_ADMIN_NSP'),
        username: getOsEnv('SOCKET_ADMIN_USERNAME'),
        password: getOsEnv('SOCKET_ADMIN_PASSWORD'),
    },
    tracer: {
        enabled: toBool(getOsEnv('TRACER_ENABLED')),
        url: getOsEnvOptional('TRACER_EXPORTER_URL'),
        dashboardUrl: getOsEnv('TRACER_DASHBOARD_URL'),
    }
} as const;