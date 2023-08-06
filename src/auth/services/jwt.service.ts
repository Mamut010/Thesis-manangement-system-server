import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { JwtServiceInterface } from '../interfaces';
import { AUTH_SETTINGS } from '../../core/constants/auth-settings';
import { JWT_TOKEN_TYPES } from '../../core/constants/jwt-token-types';
import { AuthTokens } from '../../shared/types/auth-tokens';
import { JwtAccessContextDto, JwtAccessPayloadDto, JwtRefreshContextDto, JwtRefreshPayloadDto } from '../../shared/dtos';
import { instanceToPlainSkipUnset } from '../../utils/class-transformer-helpers';
import { JwtTokenType } from '../../shared/types/jwt-token-type';

@injectable()
export class JwtService implements JwtServiceInterface {
    private getSettingsByTokenType(tokenType: JwtTokenType) {
        if (tokenType === JWT_TOKEN_TYPES.AccessToken) {
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

        const settings = this.getSettingsByTokenType(JWT_TOKEN_TYPES.AccessToken);

        const token = jwt.sign(instanceToPlainSkipUnset(payload), settings.secret, {
            expiresIn: settings.expiresIn,
            ...AUTH_SETTINGS.Jwt.DefaultSignOptions,
        });

        return token;
    }

    generateRefreshToken(context: JwtRefreshContextDto): string {
        const payload = new JwtRefreshPayloadDto();
        payload.context = context;

        const settings = this.getSettingsByTokenType(JWT_TOKEN_TYPES.RefreshToken);
        
        const token = jwt.sign(instanceToPlainSkipUnset(payload), settings.secret, {
            expiresIn: settings.expiresIn,
            ...AUTH_SETTINGS.Jwt.DefaultSignOptions,
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
        const secret = this.getSettingsByTokenType(JWT_TOKEN_TYPES.AccessToken).secret;
        return plainToInstance(JwtAccessPayloadDto, jwt.verify(token, secret, AUTH_SETTINGS.Jwt.DefaultSignOptions));
    }

    verifyRefreshToken(token: string): JwtRefreshPayloadDto {
        const secret = this.getSettingsByTokenType(JWT_TOKEN_TYPES.RefreshToken).secret;
        return plainToInstance(JwtRefreshPayloadDto, jwt.verify(token, secret, AUTH_SETTINGS.Jwt.DefaultSignOptions));
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