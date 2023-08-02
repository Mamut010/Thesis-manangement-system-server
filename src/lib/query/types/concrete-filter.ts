import { BooleanFilter } from "../filters/basic/bool.filter";
import { DateListFilter } from "../filters/basic/date-list.filter";
import { DateFilter } from "../filters/basic/date.filter";
import { NumberListFilter } from "../filters/basic/number-list.filter";
import { NumberFilter } from "../filters/basic/number.filter";
import { StringListFilter } from "../filters/basic/string-list.filter";
import { StringFilter } from "../filters/basic/string.filter";

export type ConcreteBinaryFilter = StringFilter | NumberFilter | DateFilter | BooleanFilter;
export type ConcreteListFilter = StringListFilter | NumberListFilter | DateListFilter;