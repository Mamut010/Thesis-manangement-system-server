import { NumberFilter, OrderBy, Pagination, StringFilter } from "../../lib/query";
import { IsNumberFilter, IsOrderByArray, IsPagination, IsStringFilter } from "../../decorators";

export class StudentsQueryRequest {
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

    @IsPagination()
    pagination: Pagination = new Pagination();

    @IsOrderByArray()
    orderBy?: OrderBy[];
}