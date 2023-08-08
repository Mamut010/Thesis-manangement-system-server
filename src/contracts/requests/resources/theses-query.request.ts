import { 
    IsNullableDateFilter,
    IsNullableNumberFilter, 
    IsNullableStringFilter, 
    IsNumberFilter, 
    IsStringFilter 
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
    @IsNumberFilter()
    thesisIdFilter?: NumberFilter;

    @IsNullableStringFilter()
    titleFilter?: NullableStringFilter;

    @IsStringFilter()
    topicTitleFilter?: StringFilter;

    @IsStringFilter()
    fieldTitleFilter?: StringFilter;

    @IsNumberFilter()
    slotFilter?: NumberFilter;

    @IsNullableNumberFilter()
    slotLimitFilter?: NullableNumberFilter;

    @IsNullableDateFilter()
    submissionDeadlineFilter?: NullableDateFilter;
}