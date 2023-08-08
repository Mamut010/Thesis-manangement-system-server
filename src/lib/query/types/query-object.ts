import { RequireOnlyOne } from "../../../utils/types";
import { 
    FilterActualOperator, 
    FilterOperator, 
    NonNullableFilterOperator, 
    NullableExclusiveFilterOperator 
} from "./filter-operator";
import { ListFilterOperator } from "./list-filter-operator";
import { SortDir } from "./sort-dir";

export type OrderByQueryObject = { 
    [property: string]: SortDir | OrderByQueryObject 
};

export type NullableFilteringObject = {
    equals: null
}

export type ActualNonNullableFilteringObject<TValue> = RequireOnlyOne<{ 
    [operator in Exclude<FilterActualOperator, NullableExclusiveFilterOperator>]: TValue 
}>;

export type ActualListFilteringObject<TValue> = RequireOnlyOne<{ 
    [operator in ListFilterOperator]: TValue 
}>;

export type ActualNullableFilteringObject<TValue> = ActualNonNullableFilteringObject<TValue> | NullableFilteringObject;

export type ActualFilteringObject<TValue, TOperator extends FilterOperator | ListFilterOperator> = 
    TOperator extends FilterOperator
        ? TOperator extends NonNullableFilterOperator
            ? ActualNonNullableFilteringObject<TValue> 
            : ActualNullableFilteringObject<TValue>
        : ActualListFilteringObject<TValue>;

// Defaulted TOperator to FilterActualOperator as for WhereQueryObject, there is no way to know the actual operator
export type WhereBinaryFilterObject<TValue, TOperator extends FilterOperator = FilterOperator> = 
    ActualFilteringObject<TValue, TOperator> | { not: ActualFilteringObject<TValue, TOperator> }

export type WhereListFilterObject<TValue> = ActualFilteringObject<TValue[], ListFilterOperator>;

export type WhereQueryObject = { 
    [property: string]: WhereBinaryFilterObject<unknown> | WhereListFilterObject<unknown> | WhereQueryObject
};

export interface PaginationQueryObject { 
    skip?: number, 
    take?: number 
}

export interface PrismaQueryObject {
    where: WhereQueryObject | undefined;
    orderBy: OrderByQueryObject | OrderByQueryObject[] | undefined;
    skip: number | undefined
    take: number | undefined;
}