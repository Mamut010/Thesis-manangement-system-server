import { BooleanFilter } from "../filters/bool.filter";
import { DateListFilter } from "../filters/date-list.filter";
import { DateFilter } from "../filters/date.filter";
import { NullableBooleanFilter } from "../filters/nullable-bool.filter";
import { NullableDateFilter } from "../filters/nullable-date.filter";
import { NullableNumberFilter } from "../filters/nullable-number.filter";
import { NullableStringFilter } from "../filters/nullable-string.filter";
import { NumberListFilter } from "../filters/number-list.filter";
import { NumberFilter } from "../filters/number.filter";
import { StringListFilter } from "../filters/string-list.filter";
import { StringFilter } from "../filters/string.filter";

export const ConcreteBinaryFilters = [
    StringFilter, 
    NumberFilter, 
    DateFilter, 
    BooleanFilter,
    NullableStringFilter,
    NullableNumberFilter,
    NullableDateFilter,
    NullableBooleanFilter,
] as const;

export const ConcreteListFilters = [
    StringListFilter, 
    NumberListFilter, 
    DateListFilter,
] as const;