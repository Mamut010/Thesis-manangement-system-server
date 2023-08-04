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
    WhereListFilterObject, 
    WhereQueryObject
} from "../types/query-object";
import { AutoQueryCreatable, AutoQueryCreationOptions, AutoQueryModel, OrderByOptions } from "../types/query-creator-utility";

export interface PrismaQueryCreatorInterface {
    createQueryObject<T extends AutoQueryModel>(model: T, query: AutoQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : PrismaQueryObject;

    createWhereObject<T extends AutoQueryModel>(model: T, query: AutoQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : WhereQueryObject | undefined;
        
    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : WhereBinaryFilterObject<TValue> | undefined;

    createListFilteringObject<TValue>(listFilter?: ListFilter<TValue>)
        : WhereListFilterObject<TValue> | undefined;

    createOrderByObject(orderBy?: OrderBy | OrderBy[], orderByOptions?: OrderByOptions)
        : OrderByQueryObject | OrderByQueryObject[] | undefined;

    createPaginationObject(pagination?: Pagination)
        : PaginationQueryObject;
}