import {
    FilterNotOperatorValues,
    FilterOperatorValues,
    GeneralFilterNotOperators,
    GeneralFilterOperators,
    NullableExclusiveFilterNotOperators,
    NullableExclusiveFilterOperatorValues,
    NullableExclusiveFilterOperators,
    StringFilterNotOperators,
    StringFilterOperators
} from "../constants/filter-operators";
import { FilterActualOperator, FilterOperator, NullableExclusiveFilterOperator } from "../types/filter-operator";

export function getActualOperatorFromNotOperator(operator: FilterOperator): FilterActualOperator | undefined {
    switch(operator) {
        case GeneralFilterNotOperators.NotEquals:
            return GeneralFilterOperators.Equals;
        case NullableExclusiveFilterNotOperators.IsNotNull:
            return NullableExclusiveFilterOperators.IsNull;
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

export function isFilterActualOperator(operator: unknown): operator is FilterActualOperator {
    return FilterOperatorValues.some(item => item === operator)
        && FilterNotOperatorValues.every(item => item !== operator);
}

export function isNullableOperator(operator: unknown): operator is NullableExclusiveFilterOperator {
    return NullableExclusiveFilterOperatorValues.some(item => item === operator)
}