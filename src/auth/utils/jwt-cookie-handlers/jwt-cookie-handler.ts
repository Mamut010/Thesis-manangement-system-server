import { inject, injectable } from "inversify";
import { JwtCookieHandlerInterface } from "./jwt-cookie-handler.interface";
import { Request, Response } from 'express';
import { AUTH_SETTINGS } from "../../../core/constants/auth-settings";
import { JwtServiceInterface } from "../../interfaces";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";

@injectable()
export class JwtCookieHandler implements JwtCookieHandlerInterface {
    constructor(@inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface) {

    }

    attachRefreshTokenToCookie(response: Response, token: string): void {
        response.cookie(AUTH_SETTINGS.Jwt.RefreshTokenCookie, token, {
            httpOnly: true,
            expires: this.jwtService.getTokenExp(token)
        });
    }

    detachRefreshTokenFromCookie(response: Response): void {
        response.clearCookie(AUTH_SETTINGS.Jwt.RefreshTokenCookie, {
            httpOnly: true
        });
    }

    extractRefreshTokenFromCookie(request: Request): string | undefined {
        const cookies = request.cookies as Record<string, string | undefined>;
        return cookies[AUTH_SETTINGS.Jwt.RefreshTokenCookie];
    }
}