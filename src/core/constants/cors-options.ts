import { CorsOptions } from 'cors';
import { env } from '../../env';
import { HTTP_CODES } from './http-codes';

export const CORS_OPTIONS: CorsOptions = {
    origin: env.cors.allowOrigins,
    credentials: true,
    optionsSuccessStatus: HTTP_CODES.Ok,
};