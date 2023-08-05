import { IsOrderByArray, IsPagination, IsStringFilter } from "../../decorators";
import { OrderBy, Pagination, StringFilter } from "../../lib/query";

export class RolesQueryRequest {
    @IsStringFilter()
    nameFilter?: StringFilter;

    @IsStringFilter()
    descriptionFilter?: StringFilter;

    @IsPagination()
    pagination?: Pagination = new Pagination();

    @IsOrderByArray()
    orderBy?: OrderBy[];
}