import { Expose } from "class-transformer";
import { IsDefined, IsIn } from "class-validator";
import { ActionType } from "../../../api/others/workflow";
import { RequestInfoDto } from "./request-info.dto";

export class RequestStateInfoDto extends RequestInfoDto {
    @Expose()
    @IsDefined()
    @IsIn(Object.values(ActionType), { each: true })
    actionTypes!: ActionType[];
}