import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class ProgramAdminGroup {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    groupId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    programId!: number;
}