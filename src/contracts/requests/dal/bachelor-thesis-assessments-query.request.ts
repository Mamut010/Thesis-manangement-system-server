import {
    IsNullableStringFilterArray,
    IsNullableNumberFilterArray,
    IsNullableDateFilterArray,
    IsStringFilterArray,
    IsNumberFilterArray,
    IsBooleanFilterArray
} from "../../../decorators";
import {
    NullableStringFilter,
    NullableNumberFilter,
    NullableDateFilter,
    StringFilter,
    NumberFilter,
    BooleanFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisAssessmentsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNumberFilterArray()
    attemptNoFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    thesisTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    furtherParticipantsFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    supervisor1TitleFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    supervisor1GradeFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    supervisor2TitleFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    supervisor2GradeFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    assessmentDescriptionFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    assessmentDateFilter?: NullableDateFilter[];

    @IsBooleanFilterArray()
    supervisor1ConfirmedFilter?: BooleanFilter[];

    @IsBooleanFilterArray()
    supervisor2ConfirmedFilter?: BooleanFilter[];
}