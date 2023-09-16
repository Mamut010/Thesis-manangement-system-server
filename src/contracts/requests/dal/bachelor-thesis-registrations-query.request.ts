import {
    IsNullableStringFilterArray, 
    IsNullableDateFilterArray,
    IsStringFilterArray,
    IsNumberFilterArray
} from "../../../decorators";
import {
    NullableStringFilter, 
    NullableDateFilter,
    StringFilter,
    NumberFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisRegistrationsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNumberFilterArray()
    attemptNoFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    dateOfBirthFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    placeOfBirthFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    thesisTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    furtherParticipantsFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    studentDateFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    supervisor1TitleFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    supervisor1DateFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    supervisor2TitleFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    supervisor2DateFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    issuedFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    deadlineCopyFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    extensionGrantedFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    chairmanOfExaminationFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    dateOfIssueFilter?: NullableDateFilter[];
}