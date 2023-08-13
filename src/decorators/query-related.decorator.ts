import { 
    BooleanFilter, 
    DateFilter, 
    DateListFilter, 
    EmailFilter, 
    EmailListFilter, 
    NullableBooleanFilter, 
    NullableDateFilter, 
    NullableEmailFilter, 
    NullableNumberFilter, 
    NullableStringFilter, 
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

export const IsNullableStringFilter = optionalNestedDecoratorFactory(() => NullableStringFilter);
export const IsNullableNumberFilter = optionalNestedDecoratorFactory(() => NullableNumberFilter);
export const IsNullableDateFilter = optionalNestedDecoratorFactory(() => NullableDateFilter);
export const IsNullableBooleanFilter = optionalNestedDecoratorFactory(() => NullableBooleanFilter);
export const IsNullableEmailFilter = optionalNestedDecoratorFactory(() => NullableEmailFilter);

export const IsStringListFilter = optionalNestedDecoratorFactory(() => StringListFilter);
export const IsNumberListFilter = optionalNestedDecoratorFactory(() => NumberListFilter);
export const IsDateListFilter = optionalNestedDecoratorFactory(() => DateListFilter);
export const IsEmailListFilter = optionalNestedDecoratorFactory(() => EmailListFilter);

export const IsPagination = optionalNestedDecoratorFactory(() => Pagination);
export const IsOrderBy = optionalNestedDecoratorFactory(() => OrderBy);

// Array
export const IsStringFilterArray = optionalNestedDecoratorFactory(() => StringFilter, true);
export const IsNumberFilterArray = optionalNestedDecoratorFactory(() => NumberFilter, true);
export const IsDateFilterArray = optionalNestedDecoratorFactory(() => DateFilter, true);
export const IsBooleanFilterArray = optionalNestedDecoratorFactory(() => BooleanFilter, true);
export const IsEmailFilterArray = optionalNestedDecoratorFactory(() => EmailFilter, true);

export const IsNullableStringFilterArray = optionalNestedDecoratorFactory(() => NullableStringFilter, true);
export const IsNullableNumberFilterArray = optionalNestedDecoratorFactory(() => NullableNumberFilter, true);
export const IsNullableDateFilterArray = optionalNestedDecoratorFactory(() => NullableDateFilter, true);
export const IsNullableBooleanFilterArray = optionalNestedDecoratorFactory(() => NullableBooleanFilter, true);
export const IsNullableEmailFilterArray = optionalNestedDecoratorFactory(() => NullableEmailFilter, true);

export const IsStringListFilterArray = optionalNestedDecoratorFactory(() => StringListFilter, true);
export const IsNumberListFilterArray = optionalNestedDecoratorFactory(() => NumberListFilter, true);
export const IsDateListFilterArray = optionalNestedDecoratorFactory(() => DateListFilter, true);
export const IsEmailListFilterArray = optionalNestedDecoratorFactory(() => EmailListFilter, true);

export const IsOrderByArray = optionalNestedDecoratorFactory(() => OrderBy, true);