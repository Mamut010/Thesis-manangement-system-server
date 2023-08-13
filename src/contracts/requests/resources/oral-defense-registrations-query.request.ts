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

export class OralDefenseRegistrationsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsNullableStringFilter()
    surnameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    forenameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    thesisTitleFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    supervisor1TitleFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    supervisor2TitleFilter?: NullableStringFilter;

    @IsNullableBooleanFilter()
    areSpectatorsAllowedFilter?: NullableBooleanFilter;

    @IsNullableStringFilter()
    weekdayFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    proposedDateFilter?: NullableDateFilter;

    @IsNullableDateFilter()
    actualDateFilter?: NullableDateFilter;

    @IsNullableStringFilter()
    roomFilter?: NullableStringFilter;

    @IsNullableNumberFilter()
    concernedAgreedFilter?: NullableNumberFilter;

    @IsNullableDateFilter()
    receivingDateFilter?: NullableDateFilter;

    @IsNullableDateFilter()
    submissionDateFilter?: NullableDateFilter;
}