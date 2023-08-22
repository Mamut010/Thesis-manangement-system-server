import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class WsAuthenticateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    token!: string
}