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

export class OralDefenseRegistrationsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

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