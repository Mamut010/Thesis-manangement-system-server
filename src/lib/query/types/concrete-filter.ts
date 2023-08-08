import { OneOf } from "../../../utils/types";
import { BooleanFilter } from "../filters/basic/bool.filter";
import { DateListFilter } from "../filters/basic/date-list.filter";
import { DateFilter } from "../filters/basic/date.filter";
import { NullableBooleanFilter } from "../filters/basic/nullable-bool.filter";
import { NullableDateFilter } from "../filters/basic/nullable-date.filter";
import { NullableNumberFilter } from "../filters/basic/nullable-number.filter";
import { NullableStringFilter } from "../filters/basic/nullable-string.filter";
import { NumberListFilter } from "../filters/basic/number-list.filter";
import { NumberFilter } from "../filters/basic/number.filter";
import { StringListFilter } from "../filters/basic/string-list.filter";
import { StringFilter } from "../filters/basic/string.filter";

export type ConcreteBinaryFilter = OneOf<[
    StringFilter, 
    NumberFilter, 
    DateFilter, 
    BooleanFilter,
    NullableStringFilter,
    NullableNumberFilter,
    NullableDateFilter,
    NullableBooleanFilter,
]>;

export type ConcreteListFilter = OneOf<[
    StringListFilter, 
    NumberListFilter, 
    DateListFilter,
]>;