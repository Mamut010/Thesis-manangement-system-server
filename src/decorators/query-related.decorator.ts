import { 
    BooleanFilter, 
    DateFilter, 
    DateListFilter, 
    EmailFilter, 
    EmailListFilter, 
    NumberFilter, 
    NumberListFilter, 
    OrderBy, 
    Pagination, 
    StringFilter, 
    StringListFilter 
} from "../lib/query";
import { optionalNestedDecoratorFactory } from "./optional-nested-decorator-factory";

export const IsStringFilter = optionalNestedDecoratorFactory(() => StringFilter);
export const IsNumberFilter = optionalNestedDecoratorFactory(() => NumberFilter);
export const IsDateFilter = optionalNestedDecoratorFactory(() => DateFilter);
export const IsBooleanFilter = optionalNestedDecoratorFactory(() => BooleanFilter);
export const IsEmailFilter = optionalNestedDecoratorFactory(() => EmailFilter);

export const IsStringListFilter = optionalNestedDecoratorFactory(() => StringListFilter);
export const IsNumberListFilter = optionalNestedDecoratorFactory(() => NumberListFilter);
export const IsDateListFilter = optionalNestedDecoratorFactory(() => DateListFilter);
export const IsEmailListFilter = optionalNestedDecoratorFactory(() => EmailListFilter);

export const IsPagination = optionalNestedDecoratorFactory(() => Pagination);

export const IsOrderBy = optionalNestedDecoratorFactory(() => OrderBy);
export const IsOrderByArray = optionalNestedDecoratorFactory(() => OrderBy, true);