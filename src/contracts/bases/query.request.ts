import { IsOrderBy, IsPagination } from "../../decorators";
import { OrderBy, Pagination } from "../../lib/query";

export abstract class QueryRequest {
    @IsPagination()
    pagination: Pagination = new Pagination();

    @IsOrderBy()
    orderBy?: OrderBy[];
}