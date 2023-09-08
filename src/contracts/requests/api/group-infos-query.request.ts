import { IsNullableStringFilterArray, IsStringFilterArray } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class GroupInfosQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    idFilter?: StringFilter[];
    
    @IsStringFilterArray()
    nameFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    descriptionFilter?: NullableStringFilter[];
}