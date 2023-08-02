import { FilterOperator } from "../types/filter-operator";

export interface BinaryFilter<TValue, TOperator extends FilterOperator> {
    value: TValue,
    operator: TOperator,
}