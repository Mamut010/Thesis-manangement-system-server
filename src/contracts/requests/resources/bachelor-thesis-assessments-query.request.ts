import { 
    IsNumberFilter, 
    IsStringFilter,
    IsNullableStringFilter,
    IsNullableNumberFilter,
    IsNullableDateFilter
} from "../../../decorators";
import { 
    NumberFilter, 
    StringFilter,
    NullableStringFilter,
    NullableNumberFilter,
    NullableDateFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisAssessmentsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsNullableStringFilter()
    surnameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    forenameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    thesisTitleFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    furtherParticipantsFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    supervisor1TitleFilter?: NullableStringFilter;

    @IsNullableNumberFilter()
    supervisor1GradeFilter?: NullableNumberFilter;

    @IsNullableStringFilter()
    supervisor2TitleFilter?: NullableStringFilter;

    @IsNullableNumberFilter()
    supervisor2GradeFilter?: NullableNumberFilter;

    @IsNullableStringFilter()
    assessmentDescriptionFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    assessmentDateFilter?: NullableDateFilter;
}