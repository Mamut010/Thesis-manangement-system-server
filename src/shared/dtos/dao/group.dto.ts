import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class GroupDto {
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
    name!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;

    @Expose()
    @IsDefined()
    @IsString({ each: true })
    memberIds!: string[];
}