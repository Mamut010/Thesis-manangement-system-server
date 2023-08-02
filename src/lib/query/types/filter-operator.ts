import { 
    BoolFilterOperatorValues, 
    DateFilterOperatorValues, 
    FilterNotOperatorValues, 
    FilterOperatorValues, 
    NumberFilterOperatorValues, 
    StringFilterOperatorValues 
} from "../constants/filter-operators";

export type FilterOperator = typeof FilterOperatorValues[number];
export type FilterNotOperator = typeof FilterNotOperatorValues[number];
export type FilterActualOperator = Exclude<FilterOperator, FilterNotOperator>;
export type StringFilterOperator = typeof StringFilterOperatorValues[number];
export type NumberFilterOperator = typeof NumberFilterOperatorValues[number];
export type DateFilterOperator = typeof DateFilterOperatorValues[number];
export type BoolFilterOperator = typeof BoolFilterOperatorValues[number];