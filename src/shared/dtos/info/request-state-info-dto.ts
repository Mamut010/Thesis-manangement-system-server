import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { ActionType, StateType } from "../../../api/others/workflow";

export class RequestStateInfoDto {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    creatorId!: string;

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
    @IsIn(Object.values(ActionType), { each: true })
    actionTypes!: ActionType[];
}