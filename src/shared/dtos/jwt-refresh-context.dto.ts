import { Expose } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator"

export class JwtRefreshContextDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    userId!: number;
}