import { Expose } from "class-transformer";
import { IsBoolean, IsDefined, IsOptional, IsString } from "class-validator";

export class WsAuthenticateResponse {
    @Expose()
    @IsDefined()
    @IsBoolean()
    authenticated!: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    message?: string;
}