import {
    IsNullableBooleanFilterArray, 
    IsNullableStringFilterArray,
    IsNullableDateFilterArray,
    IsStringFilterArray,
    IsNumberFilterArray,
    IsBooleanFilterArray
} from "../../../decorators";
import {
    NullableBooleanFilter, 
    NullableStringFilter,
    NullableDateFilter,
    StringFilter,
    NumberFilter,
    BooleanFilter
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

    @IsNullableBooleanFilterArray()
    concernedAgreedFilter?: NullableBooleanFilter[];

    @IsNullableDateFilterArray()
    receivingDateFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    submissionDateFilter?: NullableDateFilter[];

    @IsBooleanFilterArray()
    studentConfirmedFilter?: BooleanFilter[];

    @IsBooleanFilterArray()
    adminConfirmedFilter?: BooleanFilter[];
}