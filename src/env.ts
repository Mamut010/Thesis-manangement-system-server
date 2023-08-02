/**
 * @Cre: https://github.com/w3tecch/express-typescript-boilerplate
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import {
    getOsEnv, getOsEnvOptional, getOsPaths, normalizePort, toBool, toNumber
} from './lib/env';

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
    secrets: {
        accessToken: getOsEnv('ACCESS_TOKEN_SECRET'),
        refreshToken: getOsEnv('REFRESH_TOKEN_SECRET')
    },
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
        },
        shared: {
            dirs: {
                middlewares: getOsPaths('SHARED_MIDDLEWARES'),
                interceptors: getOsPaths('SHARED_INTERCEPTORS'),
            },
        },
        socket: {
            port: normalizePort(process.env.APP_SOCKET_PORT ?? getOsEnv('SOCKET_PORT')) as number,
        }
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
} as const;