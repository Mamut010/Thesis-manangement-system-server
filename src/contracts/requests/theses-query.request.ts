import { IsNumberFilter, IsOrderByArray, IsPagination, IsStringFilter } from "../../decorators";
import { NumberFilter, OrderBy, Pagination, StringFilter } from "../../lib/query";

export class ThesesQueryRequest {
    @IsNumberFilter()
    thesisIdFilter?: NumberFilter;

    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsStringFilter()
    topicFilter?: StringFilter;

    @IsStringFilter()
    fieldFilter?: StringFilter;

    @IsNumberFilter()
    slotFilter?: NumberFilter;

    @IsNumberFilter()
    slotLimitFilter?: NumberFilter;

    @IsPagination()
    pagination: Pagination = new Pagination();

    @IsOrderByArray()
    orderBy?: OrderBy[];
}