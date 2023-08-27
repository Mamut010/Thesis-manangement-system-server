import { Request, Response } from 'express';
import { JwtAccessPayloadDto, UserInfoDto } from '../../shared/dtos';
import { LoginRequest, SignUpRequest } from '../../contracts/requests';
import { StringResponse, StringArrayResponse } from '../../contracts/responses';
import { AuthorizedUser } from '../../core/auth-checkers';

export interface AuthServiceInterface {
    signup(signUpRequest: SignUpRequest): Promise<UserInfoDto>;
    login(response: Response, loginRequest: LoginRequest): Promise<StringResponse>;
    logout(user: AuthorizedUser, response: Response): Promise<void>;
    getRoles(user: AuthorizedUser): StringArrayResponse;
    issueAccessToken(request: Request, response: Response): Promise<StringResponse>;
    verifyJwtTokenInRequest(request: Request): Promise<JwtAccessPayloadDto | undefined>;
}