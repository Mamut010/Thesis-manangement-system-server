import { BinaryFilter } from "./binary-filter";
import { OrderBy } from "../order-by";
import { Pagination } from "../pagination";
import { FilterActualOperator, FilterOperator, SortDir } from "../types";
import { ListFilterOperator } from "../types/list-filter-operator";
import { ListFilter } from "./list-filter";

export interface PrismaQueryCreatorInterface {
    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : Partial<Record<FilterActualOperator, TValue>> | { not: Partial<Record<FilterActualOperator, TValue>> } | undefined;

    createListFilteringObject<TValue>(listFilter?: ListFilter<TValue>)
        : Partial<Record<ListFilterOperator, TValue[]>> | undefined;

    createOrderByObject(orderBy: OrderBy | OrderBy[])
        : { [key: string]: SortDir } | { [key: string]: SortDir }[] | undefined;

    createPaginationObject(pagination?: Pagination)
        : { skip?: number, take?: number };
}