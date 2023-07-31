import { Expose } from "class-transformer"
import { IsDate, IsDefined, IsNumber, IsString } from "class-validator"

export class RefreshToken {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number

    @Expose()
    @IsDefined()
    @IsNumber()
    userId!: number

    @Expose()
    @IsDefined()
    @IsString()
    token!: string

    @Expose()
    @IsDefined()
    @IsDate()
    exp!: Date
}