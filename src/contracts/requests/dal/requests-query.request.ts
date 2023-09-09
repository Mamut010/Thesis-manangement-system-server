import { IsNullableStringFilterArray, IsStringFilterArray } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class RequestsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    idFilter?: StringFilter[];

    @IsStringFilterArray()
    processIdFilter?: StringFilter[];
    
    @IsStringFilterArray()
    creatorIdFilter?: StringFilter[];

    @IsStringFilterArray()
    stakeholderIdFilter?: StringFilter[];

    @IsStringFilterArray()
    titleFilter?: StringFilter[];

    @IsStringFilterArray()
    stateTypeFilter?: StringFilter[];

    @IsStringFilterArray()
    stateFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    stateDescriptionFilter?: NullableStringFilter[];
}