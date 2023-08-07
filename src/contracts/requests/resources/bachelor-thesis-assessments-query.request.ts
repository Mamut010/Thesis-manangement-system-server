import { IsNumberFilter, IsStringFilter, IsDateFilter } from "../../../decorators";
import { NumberFilter, StringFilter, DateFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisAssessmentsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsStringFilter()
    surnameFilter?: StringFilter;

    @IsStringFilter()
    forenameFilter?: StringFilter;

    @IsStringFilter()
    thesisTypeFilter?: StringFilter;

    @IsStringFilter()
    furtherParticipantsFilter?: StringFilter;

    @IsStringFilter()
    supervisor1TitleFilter?: StringFilter;

    @IsNumberFilter()
    supervisor1GradeFilter?: NumberFilter;

    @IsStringFilter()
    supervisor2TitleFilter?: StringFilter;

    @IsNumberFilter()
    supervisor2GradeFilter?: NumberFilter;

    @IsStringFilter()
    assessmentDescriptionFilter?: StringFilter;

    @IsDateFilter()
    assessmentDateFilter?: DateFilter;
}