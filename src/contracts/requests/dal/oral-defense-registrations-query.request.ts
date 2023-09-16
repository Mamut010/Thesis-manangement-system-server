import {
    IsNullableBooleanFilterArray, 
    IsNullableStringFilterArray,
    IsNullableDateFilterArray,
    IsNullableNumberFilterArray,
    IsStringFilterArray,
    IsNumberFilterArray
} from "../../../decorators";
import {
    NullableBooleanFilter, 
    NullableStringFilter,
    NullableDateFilter,
    NullableNumberFilter,
    StringFilter,
    NumberFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class OralDefenseRegistrationsQueryRequest extends BaseQueryRequest {
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
    supervisor1TitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    supervisor2TitleFilter?: NullableStringFilter[];

    @IsNullableBooleanFilterArray()
    areSpectatorsAllowedFilter?: NullableBooleanFilter[];

    @IsNullableDateFilterArray()
    proposedDateFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    actualDateFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    roomFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    concernedAgreedFilter?: NullableNumberFilter[];

    @IsNullableDateFilterArray()
    receivingDateFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    submissionDateFilter?: NullableDateFilter[];
}