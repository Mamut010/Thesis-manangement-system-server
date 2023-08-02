import { BinaryFilter } from "./binary-filter";
import { OrderBy } from "../order-by";
import { Pagination } from "../pagination";
import { ListFilter } from "./list-filter";
import { FilterOperator } from "../types/filter-operator";
import { 
    OrderByQueryObject, 
    PaginationQueryObject, 
    PrismaQueryObject, 
    WhereBinaryFilterObject, 
    WhereListFilterObject 
} from "../types/prisma-query-object";
import { AutoQueryCreatable, AutoQueryCreationOptions, AutoQueryModel } from "../types/auto-query";

export interface PrismaQueryCreatorInterface {
    createQueryObject<T extends AutoQueryModel>(model: T, query: AutoQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : PrismaQueryObject;
        
    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : WhereBinaryFilterObject<TValue> | undefined;

    createListFilteringObject<TValue>(listFilter?: ListFilter<TValue>)
        : WhereListFilterObject<TValue> | undefined;

    createOrderByObject(orderBy?: OrderBy | OrderBy[], fieldMap?: Record<string, string>)
        : OrderByQueryObject | OrderByQueryObject[] | undefined;

    createPaginationObject(pagination?: Pagination)
        : PaginationQueryObject;
}