import { JwtAccessContextDto, JwtAccessPayloadDto, JwtRefreshContextDto, JwtRefreshPayloadDto } from "../dtos";
import { AuthTokens } from "../types/auth-tokens";

export interface JwtServiceInterface {
    generateAccessToken(context: JwtAccessContextDto): string;
    generateRefreshToken(context: JwtRefreshContextDto): string;
    generateTokens(accessContext: JwtAccessContextDto, refreshContext: JwtRefreshContextDto): AuthTokens;
    verifyAccessToken(token: string): JwtAccessPayloadDto;
    verifyRefreshToken(token: string): JwtRefreshPayloadDto;
    decodeAccessToken(token: string): JwtAccessPayloadDto;
    decodeRefreshToken(token: string): JwtRefreshPayloadDto;
    getTokenExp(token: string): Date;
}