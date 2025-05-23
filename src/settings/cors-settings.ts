import { CorsOptions } from 'cors';
import { env } from '../env';
import { HTTP_CODES } from '../core/constants/http-codes';

export const CORS_SETTINGS: Readonly<CorsOptions> = {
    origin: env.cors.allowOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: HTTP_CODES.Ok,
};