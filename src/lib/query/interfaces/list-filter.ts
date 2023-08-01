import { ListFilterOperator } from "../types/list-filter-operator";

export interface ListFilter<TValue> {
    value: TValue[],
    operator: ListFilterOperator,
}