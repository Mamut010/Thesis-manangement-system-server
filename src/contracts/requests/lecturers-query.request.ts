import { NumberFilter, OrderBy, Pagination, StringFilter } from "../../lib/query";
import { IsNumberFilter, IsOrderBy, IsPagination, IsStringFilter } from "../../decorators";

export class LecturersQueryRequest {
    @IsNumberFilter()
    lecturerIdFilter?: NumberFilter;

    @IsStringFilter()
    username?: StringFilter;

    @IsStringFilter()
    title?: StringFilter;

    @IsStringFilter()
    email?: StringFilter;

    @IsPagination()
    pagination: Pagination = new Pagination();

    @IsOrderBy()
    orderBy?: OrderBy[];
}