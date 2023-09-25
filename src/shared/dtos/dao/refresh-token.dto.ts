import { Expose } from "class-transformer"
import { IsDefined, IsNumber, IsString } from "class-validator"

export class RefreshTokenDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    token!: string;
}