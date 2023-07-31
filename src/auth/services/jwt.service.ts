import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { JwtServiceInterface } from '../interfaces';
import { route } from '../../utils/route';
import { AUTH_SETTINGS } from '../../core/constants/auth-settings';
import { JwtTokenTypes } from '../../core/enums/jwt-token-types';
import { AuthTokens } from '../../shared/types/auth-tokens';
import { JwtAccessContextDto, JwtAccessPayloadDto, JwtRefreshContextDto, JwtRefreshPayloadDto } from '../../shared/dtos';
import { instanceToPlainSkipUnset } from '../../utils/class-transformer-helpers';

@injectable()
export class JwtService implements JwtServiceInterface {
    private static readonly DEFAULT_SIGN_OPTIONS = {
        issuer: route('auth'),
        audience: route('api')
    }

    private getSettingsByTokenType(tokenType: JwtTokenTypes) {
        if (tokenType === JwtTokenTypes.accessToken) {
            return {
                secret: AUTH_SETTINGS.Jwt.AccessTokenSecret,
                expiresIn: AUTH_SETTINGS.Jwt.AccessTokenTtl,
            }
        }
        else {
            return {
                secret: AUTH_SETTINGS.Jwt.RefreshTokenSecret,
                expiresIn: AUTH_SETTINGS.Jwt.RefreshTokenTtl,
            }
        }
    }

    generateAccessToken(context: JwtAccessContextDto): string {
        const payload = new JwtAccessPayloadDto();
        payload.context = context;

        const settings = this.getSettingsByTokenType(JwtTokenTypes.accessToken);

        const token = jwt.sign(instanceToPlainSkipUnset(payload), settings.secret, {
            expiresIn: settings.expiresIn,
            ...JwtService.DEFAULT_SIGN_OPTIONS,
        });

        return token;
    }

    generateRefreshToken(context: JwtRefreshContextDto): string {
        const payload = new JwtRefreshPayloadDto();
        payload.context = context;

        const settings = this.getSettingsByTokenType(JwtTokenTypes.refreshToken);
        
        const token = jwt.sign(instanceToPlainSkipUnset(payload), settings.secret, {
            expiresIn: settings.expiresIn,
            ...JwtService.DEFAULT_SIGN_OPTIONS,
        });

        return token;
    }

    generateTokens(accessContext: JwtAccessContextDto, refreshContext: JwtRefreshContextDto): AuthTokens {
        return {
            accessToken: this.generateAccessToken(accessContext),
            refreshToken: this.generateRefreshToken(refreshContext),
        }
    }

    verifyAccessToken(token: string): JwtAccessPayloadDto {
        const secret = this.getSettingsByTokenType(JwtTokenTypes.accessToken).secret;
        return plainToInstance(JwtAccessPayloadDto, jwt.verify(token, secret, JwtService.DEFAULT_SIGN_OPTIONS));
    }

    verifyRefreshToken(token: string): JwtRefreshPayloadDto {
        const secret = this.getSettingsByTokenType(JwtTokenTypes.refreshToken).secret;
        return plainToInstance(JwtRefreshPayloadDto, jwt.verify(token, secret, JwtService.DEFAULT_SIGN_OPTIONS));
    }

    decodeAccessToken(token: string): JwtAccessPayloadDto {
        return plainToInstance(JwtAccessPayloadDto, jwt.decode(token));
    }

    decodeRefreshToken(token: string): JwtRefreshPayloadDto {
        return plainToInstance(JwtRefreshPayloadDto, jwt.decode(token));
    }

    getTokenExp(token: string): Date {
        const exp = (jwt.decode(token) as jwt.JwtPayload).exp ?? 0;
        return new Date(exp * 1000);
    }
}