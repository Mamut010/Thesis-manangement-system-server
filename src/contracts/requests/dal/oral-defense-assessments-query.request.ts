import {
    IsNullableBooleanFilterArray, 
    IsNullableStringFilterArray,
    IsNullableDateFilterArray,
    IsNullableNumberFilterArray,
    IsStringFilterArray
} from "../../../decorators";
import {
    NullableBooleanFilter, 
    NullableStringFilter,
    NullableDateFilter,
    NullableNumberFilter,
    StringFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class OralDefenseAssessmentsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    thesisTitleFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    dateDefenseFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    placeDefenseFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    startDateFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    finishDateFilter?: NullableDateFilter[];

    @IsNullableBooleanFilterArray()
    stateOfHealthFilter?: NullableBooleanFilter[];

    @IsNullableStringFilterArray()
    supervisor1TitleFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    supervisor1GradeFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    supervisor2TitleFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    supervisor2GradeFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    recordFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    assessmentDateFilter?: NullableDateFilter[];
}