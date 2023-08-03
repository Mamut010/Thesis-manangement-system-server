import { FilterActualOperator } from "./filter-operator";
import { ListFilterOperator } from "./list-filter-operator";
import { SortDir } from "./sort-dir";

export type OrderByQueryObject = { 
    [property: string]: SortDir | OrderByQueryObject 
};

export type WhereBinaryFilterObject<TValue> = 
    Partial<Record<FilterActualOperator, TValue>> 
    | { not: Partial<Record<FilterActualOperator, TValue>>; }

export type WhereListFilterObject<TValue> = Partial<Record<ListFilterOperator, TValue[]>>;

export type WhereQueryObject = { 
    [property: string]: WhereBinaryFilterObject<any> | WhereListFilterObject<any> | WhereQueryObject
};

export interface PaginationQueryObject { 
    skip?: number, 
    take?: number 
}

export interface PrismaQueryObject {
    where?: WhereQueryObject;
    orderBy?: OrderByQueryObject | OrderByQueryObject[];
    skip?: number;
    take?: number;
}