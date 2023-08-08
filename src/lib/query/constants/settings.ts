import { GeneralFilterOperators, StringFilterOperators } from "./filter-operators";
import { ListFilterOperators } from "./list-filter-operators";
import { SortDirs } from "./sort-dirs";

export const DefaultQuerySettings = {
    StringFilterOperator: StringFilterOperators.Contains,
    NumberFilterOperator: GeneralFilterOperators.Equals,
    DateFilterOperator: GeneralFilterOperators.Equals,
    BoolFilterOperator: GeneralFilterOperators.Equals,

    NullableStringFilterOperator: StringFilterOperators.Contains,
    NullableNumberFilterOperator: GeneralFilterOperators.Equals,
    NullableDateFilterOperator: GeneralFilterOperators.Equals,
    NullableBoolFilterOperator: GeneralFilterOperators.Equals,

    ListFilterOperator: ListFilterOperators.In,

    SortDir: SortDirs.Ascending,
    Take: 30,
    MinTake: 1,
    MaxTake: 100,
} as const;