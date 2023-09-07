import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class State {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    processId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    stateTypeId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    name!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;
}