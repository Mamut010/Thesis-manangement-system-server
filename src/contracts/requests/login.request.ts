import { IsDefined, IsString } from "class-validator"

export class LoginRequest {
    @IsDefined()
    @IsString()
    username!: string

    @IsDefined()
    @IsString()
    password!: string
}