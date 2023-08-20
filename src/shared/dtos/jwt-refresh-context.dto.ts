import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator"

export class JwtRefreshContextDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;
}