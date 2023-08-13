import { 
    IsNumberFilter, 
    IsStringFilter,
    IsNullableStringFilter, 
    IsNullableDateFilter,
    IsNullableBooleanFilter
} from "../../../decorators";
import { 
    NumberFilter, 
    StringFilter,
    NullableStringFilter, 
    NullableDateFilter,
    NullableBooleanFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisRegistrationsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsNullableStringFilter()
    surnameFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    forenameFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    dateOfBirthFilter?: NullableDateFilter;

    @IsNullableStringFilter()
    placeOfBirthFilter?: NullableStringFilter;

    @IsNullableStringFilter()
    thesisTitleFilter?: NullableStringFilter;

    @IsStringFilter()
    thesisTypeFilter?: StringFilter;

    @IsNullableStringFilter()
    furtherParticipantsFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    studentDateFilter?: NullableDateFilter;

    @IsNullableStringFilter()
    supervisor1TitleFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    supervisor1DateFilter?: NullableDateFilter;

    @IsNullableBooleanFilter()
    supervisor1ConfirmedFilter?: NullableBooleanFilter;

    @IsNullableStringFilter()
    supervisor2TitleFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    supervisor2DateFilter?: NullableDateFilter;

    @IsNullableBooleanFilter()
    supervisor2ConfirmedFilter?: NullableBooleanFilter;

    @IsNullableBooleanFilter()
    adminConfirmedFilter?: NullableBooleanFilter;

    @IsNullableDateFilter()
    issuedFilter?: NullableDateFilter;

    @IsNullableDateFilter()
    deadlineCopyFilter?: NullableDateFilter;

    @IsNullableDateFilter()
    extensionGrantedFilter?: NullableDateFilter;

    @IsNullableStringFilter()
    chairmanOfExaminationFilter?: NullableStringFilter;

    @IsNullableDateFilter()
    dateOfIssueFilter?: NullableDateFilter;
}