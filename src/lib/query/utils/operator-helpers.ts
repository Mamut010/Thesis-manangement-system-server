import { BinaryFilter } from "../interfaces/binary-filter";
import {
    GeneralFilterNotOperators,
    GeneralFilterOperators,
    StringFilterNotOperators,
    StringFilterOperators
} from "../constants/filter-operators";
import { FilterActualOperator, FilterOperator } from "../types";

export function getActualOperatorFromNotOperator<TOperator = FilterOperator>
    (operator: TOperator): FilterActualOperator | void {

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
            return;
    }
}