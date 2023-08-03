import { NumberFilter, OrderBy, Pagination, StringFilter } from "../../lib/query";
import { IsNumberFilter, IsOrderBy, IsPagination, IsStringFilter } from "../../decorators";

export class LecturersQueryRequest {
    @IsNumberFilter()
    lecturerIdFilter?: NumberFilter;

    @IsStringFilter()
    usernameFilter?: StringFilter;

    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsStringFilter()
    emailFilter?: StringFilter;

    @IsPagination()
    pagination: Pagination = new Pagination();

    @IsOrderBy()
    orderBy?: OrderBy[];
}