import { 
    IsDateFilterArray,
    IsNullableNumberFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../../decorators";
import { 
    DateFilter,
    NullableNumberFilter, 
    NullableStringFilter, 
    NumberFilter, 
    StringFilter 
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class ThesesQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    thesisIdFilter?: NumberFilter[];

    @IsStringFilterArray()
    titleFilter?: StringFilter[];

    @IsStringFilterArray()
    creatorIdFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    creatorTitleFilter?: NullableStringFilter[];

    @IsStringFilterArray()
    topicTitleFilter?: StringFilter[];

    @IsStringFilterArray()
    fieldTitleFilter?: StringFilter[];

    @IsNumberFilterArray()
    slotFilter?: NumberFilter[];

    @IsNullableNumberFilterArray()
    slotLimitFilter?: NullableNumberFilter[];

    @IsDateFilterArray()
    createdAtFilter?: DateFilter[];

    @IsDateFilterArray()
    updatedAtFilter?: DateFilter[];
}