import {
    FilterNotOperatorValues,
    GeneralFilterNotOperators,
    GeneralFilterOperators,
    StringFilterNotOperators,
    StringFilterOperators
} from "../constants/filter-operators";
import { FilterActualOperator, FilterOperator } from "../types/filter-operator";

export function getActualOperatorFromNotOperator(operator: FilterOperator): FilterActualOperator | undefined {
    switch(operator) {
        case GeneralFilterNotOperators.NotEquals:
            return GeneralFilterOperators.Equals;
        case StringFilterNotOperators.NotContains:
            return StringFilterOperators.Contains;
        case StringFilterNotOperators.NotStartsWith:
            return StringFilterOperators.StartsWith;
        case StringFilterNotOperators.NotEndsWith:
            return StringFilterOperators.EndsWith;
        default:
            return undefined;
    }
}

export function isFilterActualOperator(operator: FilterOperator): operator is FilterActualOperator {
    return !FilterNotOperatorValues.find(item => item === operator);
}