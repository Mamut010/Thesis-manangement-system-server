import { 
    IsNumberFilterArray,
    IsNullableBooleanFilterArray, 
    IsNullableStringFilterArray,
    IsNullableDateFilterArray,
    IsNullableNumberFilterArray
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
    @IsNumberFilterArray()
    studentIdFilter?: NumberFilter[];

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