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
import { 
    AutoQueryCreatable, 
    AutoQueryCreationOptions, 
    AutoQueryModel, 
    AutoWhereQueryCreatable, 
    OrderByOptions 
} from "../types/query-creator-utility";
import { ClassConstructor } from "class-transformer";

export interface PrismaQueryCreatorInterface {
    createQueryModel<T extends object>(cls: ClassConstructor<T>)
        : AutoQueryModel;

    createQueryObject<T extends AutoQueryModel>(model: T, query: AutoQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : PrismaQueryObject;

    createWhereObject<T extends AutoQueryModel>(model: T, query: AutoWhereQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : WhereQueryObject | undefined;
        
    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : WhereBinaryFilterObject<TValue, TOperator> | undefined;

    createListFilteringObject<TValue>(listFilter?: ListFilter<TValue>)
        : WhereListFilterObject<TValue> | undefined;

    createOrderByObject(orderBy?: OrderBy | OrderBy[], orderByOptions?: OrderByOptions)
        : OrderByQueryObject | OrderByQueryObject[] | undefined;

    createPaginationObject(pagination?: Pagination)
        : PaginationQueryObject;
}