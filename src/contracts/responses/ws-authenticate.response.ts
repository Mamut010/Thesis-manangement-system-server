import { Expose } from "class-transformer";
import { IsBoolean, IsDefined } from "class-validator";

export class WsAuthenticateResponse {
    @Expose()
    @IsDefined()
    @IsBoolean()
    authenticated!: boolean;
}