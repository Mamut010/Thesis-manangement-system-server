import { 
    IsNullableDateFilterArray,
    IsNullableNumberFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../../decorators";
import { 
    NullableDateFilter, 
    NullableNumberFilter, 
    NullableStringFilter, 
    NumberFilter, 
    StringFilter 
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class ThesesQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    thesisIdFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    titleFilter?: NullableStringFilter[];

    @IsStringFilterArray()
    topicTitleFilter?: StringFilter[];

    @IsStringFilterArray()
    fieldTitleFilter?: StringFilter[];

    @IsNumberFilterArray()
    slotFilter?: NumberFilter[];

    @IsNullableNumberFilterArray()
    slotLimitFilter?: NullableNumberFilter[];

    @IsNullableDateFilterArray()
    submissionDeadlineFilter?: NullableDateFilter[];
}