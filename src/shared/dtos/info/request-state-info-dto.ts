import { Expose } from "class-transformer";
import { IsDefined, IsIn } from "class-validator";
import { ActionType } from "../../../api/others/workflow";
import { RequestInfoDto } from "./request-info.dto";
import { valuesOf } from "../../../utils/object-helpers";

export class RequestStateInfoDto extends RequestInfoDto {
    @Expose()
    @IsDefined()
    @IsIn(valuesOf(ActionType), { each: true })
    actionTypes!: ActionType[];
}