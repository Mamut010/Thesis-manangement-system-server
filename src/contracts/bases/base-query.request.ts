import { IsOrderByArray, IsPagination } from "../../decorators";
import { OrderBy, Pagination } from "../../lib/query";

export class BaseQueryRequest {
    @IsPagination()
    pagination: Pagination = new Pagination();

    @IsOrderByArray()
    orderBy?: OrderBy[];
}