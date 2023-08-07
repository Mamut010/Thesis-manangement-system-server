import { IsNumberFilter, IsStringFilter, IsDateFilter, IsBooleanFilter } from "../../../decorators";
import { NumberFilter, StringFilter, DateFilter, BooleanFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class OralDefenseRegistrationsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsStringFilter()
    surnameFilter?: StringFilter;

    @IsStringFilter()
    forenameFilter?: StringFilter;

    @IsStringFilter()
    supervisor1TitleFilter?: StringFilter;

    @IsStringFilter()
    supervisor2TitleFilter?: StringFilter;

    @IsBooleanFilter()
    areSpectatorsAllowedFilter?: BooleanFilter;

    @IsStringFilter()
    weekdateFilter?: StringFilter;

    @IsDateFilter()
    proposedDateFilter?: DateFilter;

    @IsDateFilter()
    actualDateFilter?: DateFilter;

    @IsStringFilter()
    roomFilter?: StringFilter;

    @IsNumberFilter()
    concernedAgreedFilter?: NumberFilter;

    @IsDateFilter()
    receivingDateFilter?: DateFilter;

    @IsDateFilter()
    submissionDateFilter?: DateFilter;
}