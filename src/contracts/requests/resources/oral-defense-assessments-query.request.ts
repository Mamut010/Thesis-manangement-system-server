import { 
    IsNumberFilter,
    IsNullableBooleanFilter, 
    IsNullableStringFilter,
    IsNullableDateFilter,
    IsNullableNumberFilter
} from "../../../decorators";
import { 
    NumberFilter,
    NullableBooleanFilter, 
    NullableStringFilter,
    NullableDateFilter,
    NullableNumberFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class OralDefenseAssessmentsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsNullableStringFilter()
    surnameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    forenameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    thesisTitleFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    dateDefenseFilter?: NullableDateFilter;

    @IsNullableStringFilter()
    placeDefenseFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    startDateFilter?: NullableDateFilter;

    @IsNullableDateFilter()
    finishDateFilter?: NullableDateFilter;

    @IsNullableBooleanFilter()
    stateOfHealthFilter?: NullableBooleanFilter;

    @IsNullableStringFilter()
    supervisor1TitleFilter?: NullableStringFilter;

    @IsNullableNumberFilter()
    supervisor1GradeFilter?: NullableNumberFilter;

    @IsNullableStringFilter()
    supervisor2TitleFilter?: NullableStringFilter;

    @IsNullableNumberFilter()
    supervisor2GradeFilter?: NullableNumberFilter;

    @IsNullableStringFilter()
    recordFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    assessmentDateFilter?: NullableDateFilter;
}