import { 
    BoolFilterOperatorValues, 
    DateFilterOperatorValues, 
    FilterNotOperatorValues, 
    FilterOperatorValues, 
    NonNullableFilterNotOperatorValues, 
    NonNullableFilterOperatorValues, 
    NullableBoolFilterOperatorValues, 
    NullableDateFilterOperatorValues, 
    NullableExclusiveFilterOperatorValues, 
    NullableNumberFilterOperatorValues, 
    NullableStringFilterOperatorValues, 
    NumberFilterOperatorValues, 
    StringFilterOperatorValues 
} from "../constants/filter-operators";

export type FilterOperator = typeof FilterOperatorValues[number];
export type FilterNotOperator = typeof FilterNotOperatorValues[number];
export type FilterActualOperator = Exclude<FilterOperator, FilterNotOperator>;
export type NonNullableFilterOperator = typeof NonNullableFilterOperatorValues[number];
export type NonNullableFilterNotOperator = typeof NonNullableFilterNotOperatorValues[number];
export type NullableExclusiveFilterOperator = typeof NullableExclusiveFilterOperatorValues[number];

export type StringFilterOperator = typeof StringFilterOperatorValues[number];
export type NumberFilterOperator = typeof NumberFilterOperatorValues[number];
export type DateFilterOperator = typeof DateFilterOperatorValues[number];
export type BoolFilterOperator = typeof BoolFilterOperatorValues[number];

export type NullableStringFilterOperator = typeof NullableStringFilterOperatorValues[number];
export type NullableNumberFilterOperator = typeof NullableNumberFilterOperatorValues[number];
export type NullableDateFilterOperator = typeof NullableDateFilterOperatorValues[number];
export type NullableBoolFilterOperator = typeof NullableBoolFilterOperatorValues[number];