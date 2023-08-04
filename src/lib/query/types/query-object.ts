import { RequireOnlyOne } from "../../../utils/types";
import { FilterActualOperator } from "./filter-operator";
import { SortDir } from "./sort-dir";

export type OrderByQueryObject = { 
    [property: string]: SortDir | OrderByQueryObject 
};

export type ActualFilteringObject<TValue> = RequireOnlyOne<{ [operator in FilterActualOperator]: TValue }>;

export type WhereBinaryFilterObject<TValue> = ActualFilteringObject<TValue> | { not: ActualFilteringObject<TValue> }

export type WhereListFilterObject<TValue> = ActualFilteringObject<TValue[]>;

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