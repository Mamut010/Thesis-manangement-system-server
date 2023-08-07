import { IsNumberFilter, IsStringFilter, IsDateFilter, IsBooleanFilter } from "../../../decorators";
import { NumberFilter, StringFilter, DateFilter, BooleanFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisRegistrationsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsStringFilter()
    surnameFilter?: StringFilter;

    @IsStringFilter()
    forenameFilter?: StringFilter;

    @IsDateFilter()
    dateOfBirthFilter?: DateFilter;

    @IsStringFilter()
    placeOfBirthFilter?: StringFilter;

    @IsStringFilter()
    thesisTitleFilter?: StringFilter;

    @IsStringFilter()
    thesisTypeFilter?: StringFilter;

    @IsStringFilter()
    furtherParticipantsFilter?: StringFilter;

    @IsDateFilter()
    studentDateFilter?: DateFilter;

    @IsStringFilter()
    supervisor1TitleFilter?: StringFilter;

    @IsDateFilter()
    supervisor1DateFilter?: DateFilter;

    @IsBooleanFilter()
    supervisor1ConfirmedFilter?: BooleanFilter;

    @IsStringFilter()
    supervisor2TitleFilter?: StringFilter;

    @IsDateFilter()
    supervisor2DateFilter?: DateFilter;

    @IsBooleanFilter()
    supervisor2ConfirmedFilter?: BooleanFilter;

    @IsBooleanFilter()
    adminConfirmedFilter?: BooleanFilter;

    @IsDateFilter()
    issuedFilter?: DateFilter;

    @IsDateFilter()
    deadlineCopyFilter?: DateFilter;

    @IsDateFilter()
    extensionGrantedFilter?: DateFilter;

    @IsStringFilter()
    chairmanOfExaminationFilter?: StringFilter;

    @IsDateFilter()
    dateOfIssueFilter?: DateFilter;
}