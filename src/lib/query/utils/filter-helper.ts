import { ConcreteBinaryFilters, ConcreteListFilters } from "../constants/concrete-filters";
import { ConcreteBinaryFilter, ConcreteListFilter } from "../types/concrete-filter";

export function isBinaryFilter(obj: any): obj is ConcreteBinaryFilter {
    return ConcreteBinaryFilters.some(filter => obj instanceof filter);
}

export function isListFilter(obj: any): obj is ConcreteListFilter {
    return ConcreteListFilters.some(filter => obj instanceof filter);
}