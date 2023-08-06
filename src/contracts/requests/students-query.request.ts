import { NumberFilter, StringFilter } from "../../lib/query";
import { IsNumberFilter, IsStringFilter } from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class StudentsQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    studentIdFilter?: NumberFilter;

    @IsStringFilter()
    usernameFilter?: StringFilter;

    @IsStringFilter()
    surnameFilter?: StringFilter;

    @IsStringFilter()
    forenameFilter?: StringFilter;

    @IsStringFilter()
    emailFilter?: StringFilter;

    @IsStringFilter()
    signatureFilter?: StringFilter;

    @IsStringFilter()
    intakeFilter?: StringFilter;

    @IsNumberFilter()
    ectsFilter?: NumberFilter;
}