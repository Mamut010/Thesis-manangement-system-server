import { ConcreteBinaryFilters, ConcreteListFilters } from "../constants/concrete-filters";
import { ConcreteBinaryFilter, ConcreteListFilter } from "../types/concrete-filter";

export function isBinaryFilter(obj: unknown): obj is ConcreteBinaryFilter {
    return ConcreteBinaryFilters.some(filter => obj instanceof filter);
}

export function isBinaryFilterArray(obj: unknown): obj is ConcreteBinaryFilter[] {
    return Array.isArray(obj) && obj.every(isBinaryFilter);
}

export function isListFilter(obj: unknown): obj is ConcreteListFilter {
    return ConcreteListFilters.some(filter => obj instanceof filter);
}

export function isListFilterArray(obj: unknown): obj is ConcreteListFilter[] {
    return Array.isArray(obj) && obj.every(isListFilter);
}