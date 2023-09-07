import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { StateType } from "../../../api/others/workflow";

export class RequestDto {
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
    creatorId!: string;

    @Expose()
    @IsDefined()
    @IsString({ each: true })
    stakeholderIds!: string[];

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsDefined()
    @IsIn(Object.values(StateType))
    stateType!: StateType;

    @Expose()
    @IsDefined()
    @IsString()
    state!: string;

    @Expose()
    @IsOptional()
    @IsString()
    stateDescription!: string | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}