import { IsNullableStringFilterArray, IsStringFilterArray } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class RequestInfosQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    idFilter?: StringFilter[];

    @IsStringFilterArray()
    processIdFilter?: StringFilter[];
    
    @IsStringFilterArray()
    creatorIdFilter?: StringFilter[];

    @IsStringFilterArray()
    titleFilter?: StringFilter[];

    @IsStringFilterArray()
    stateTypeFilter?: StringFilter[];

    @IsStringFilterArray()
    stateFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    stateDescriptionFilter?: NullableStringFilter[];
}