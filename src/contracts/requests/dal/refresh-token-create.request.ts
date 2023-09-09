import { Expose } from "class-transformer"
import { IsDate, IsDefined, IsString } from "class-validator"

export class RefreshTokenCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    token!: string;

    @Expose()
    @IsDefined()
    @IsDate()
    exp!: Date;
}