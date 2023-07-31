import { Request, Response } from 'express';

export interface JwtCookieHandlerInterface {
    attachRefreshTokenToCookie(response: Response, token: string): Promise<void> | void;
    detachRefreshTokenFromCookie(response: Response): Promise<void> | void;
    extractRefreshTokenFromCookie(request: Request): Promise<string | undefined> | string | undefined;
}