import { 
    IsDateFilterArray,
    IsNullableDateFilterArray,
    IsNullableNumberFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../../decorators";
import { 
    DateFilter,
    NullableDateFilter, 
    NullableNumberFilter, 
    NullableStringFilter, 
    NumberFilter, 
    StringFilter 
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class ThesisInfosQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    thesisIdFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    titleFilter?: NullableStringFilter[];

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

    @IsNullableDateFilterArray()
    submissionDeadlineFilter?: NullableDateFilter[];

    @IsDateFilterArray()
    createdAtFilter?: DateFilter[];

    @IsDateFilterArray()
    updatedAtFilter?: DateFilter[];
}