import { Expose } from "class-transformer"
import { IsDefined, IsString } from "class-validator"

export class LoginRequest {
    @Expose()
    @IsDefined()
    @IsString()
    username!: string

    @Expose()
    @IsDefined()
    @IsString()
    password!: string
}