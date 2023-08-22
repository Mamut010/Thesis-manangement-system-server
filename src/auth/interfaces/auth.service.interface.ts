import { Request, Response } from 'express';
import { JwtAccessPayloadDto } from '../../shared/dtos';
import { LoginRequest } from '../../contracts/requests/auth/login.request';
import { SignUpRequest } from '../../contracts/requests/auth/sign-up.request';
import { StringArrayResponse } from '../../contracts/responses/string-array.response';
import { StringResponse } from '../../contracts/responses/string.response';

export interface AuthServiceInterface {
    signUp(signUpRequest: SignUpRequest): Promise<void>;
    login(loginRequest: LoginRequest, response: Response): Promise<StringResponse>;
    logout(request: Request, response: Response): Promise<void>;
    getRoles(request: Request): Promise<StringArrayResponse>;
    issueAccessToken(request: Request, response: Response): Promise<StringResponse>;
    verifyJwtTokenInRequest(request: Request): Promise<JwtAccessPayloadDto | undefined>;
}