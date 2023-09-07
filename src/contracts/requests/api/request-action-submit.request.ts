import { Expose } from "class-transformer";
import { ActionType } from "../../../api/others/workflow";
import { IsDefined, IsIn, IsObject, IsOptional, IsString } from "class-validator";

export class RequestActionSubmitRequest {
    @Expose()
    @IsDefined()
    @IsString()
    requestId!: string;

    @Expose()
    @IsDefined()
    @IsIn(Object.values(ActionType))
    actionType!: ActionType;

    @Expose()
    @IsOptional()
    @IsObject()
    data?: Record<string, unknown>;
}