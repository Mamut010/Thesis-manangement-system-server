import { IsNullableStringFilterArray, IsStringFilterArray } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class GroupsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    idFilter?: StringFilter[];

    @IsStringFilterArray()
    processIdFilter?: StringFilter[];
    
    @IsStringFilterArray()
    nameFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    descriptionFilter?: NullableStringFilter[];

    @IsStringFilterArray()
    memberIdFilter?: StringFilter[];
}