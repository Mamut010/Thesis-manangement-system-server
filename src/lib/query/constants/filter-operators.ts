export const GeneralFilterOperators = {
    Equals: 'equals',
} as const;

export const GeneralFilterNotOperators = {
    NotEquals: 'nequals',
} as const;

export const NullableExclusiveFilterOperators = {
    IsNull: 'isNull'
} as const;

export const NullableExclusiveFilterNotOperators = {
    IsNotNull: 'nisNull'
} as const;

export const StringFilterOperators = {
    Contains: 'contains',
    StartsWith: 'startsWith',
    EndsWith: 'endsWith',
} as const;

export const StringFilterNotOperators = {
    NotContains: 'ncontains',
    NotStartsWith: 'nstartsWith',
    NotEndsWith: 'nendsWith',
} as const;

export const NumberAndDateFilterOperators = {
    LessThan: 'lt',
    LessThanOrEqual: 'lte',
    GreaterThan: 'gt',
    GreaterThanOrEqual: 'gte',
} as const;

export const FilterNotOperators = {
    ...GeneralFilterNotOperators,
    ...StringFilterNotOperators,
    ...NullableExclusiveFilterNotOperators,
} as const;

export const NonNullableFilterNotOperators = {
    ...GeneralFilterNotOperators,
    ...StringFilterNotOperators,
} as const;

export const FilterOperatorValues = [
    ...Object.values(GeneralFilterOperators), 
    ...Object.values(NullableExclusiveFilterOperators), 
    ...Object.values(StringFilterOperators),
    ...Object.values(NumberAndDateFilterOperators),
    ...Object.values(FilterNotOperators),
];

export const NullableExclusiveFilterOperatorValues = [
    ...Object.values(NullableExclusiveFilterOperators),
    ...Object.values(NullableExclusiveFilterNotOperators),
];

export const FilterNotOperatorValues = Object.values(FilterNotOperators);

export const NonNullableFilterOperatorValues = [
    ...Object.values(GeneralFilterOperators),
    ...Object.values(StringFilterOperators),
    ...Object.values(NumberAndDateFilterOperators),
    ...Object.values(NonNullableFilterNotOperators),
];

export const NonNullableFilterNotOperatorValues = Object.values(NonNullableFilterNotOperators);

export const StringFilterOperatorValues = [
    ...Object.values(GeneralFilterOperators), 
    ...Object.values(GeneralFilterNotOperators),
    ...Object.values(StringFilterOperators),
    ...Object.values(StringFilterNotOperators),
];

export const NumberFilterOperatorValues = [
    ...Object.values(GeneralFilterOperators),
    ...Object.values(GeneralFilterNotOperators),
    ...Object.values(NumberAndDateFilterOperators),
];

export const DateFilterOperatorValues = [
    ...Object.values(GeneralFilterOperators),
    ...Object.values(GeneralFilterNotOperators),
    ...Object.values(NumberAndDateFilterOperators),
];

export const BoolFilterOperatorValues = [
    ...Object.values(GeneralFilterOperators),
    ...Object.values(GeneralFilterNotOperators),
];

export const NullableStringFilterOperatorValues = [
    ...Object.values(StringFilterOperatorValues),
    ...Object.values(NullableExclusiveFilterOperatorValues),
];

export const NullableNumberFilterOperatorValues = [
    ...Object.values(NumberFilterOperatorValues),
    ...Object.values(NullableExclusiveFilterOperatorValues),
];

export const NullableDateFilterOperatorValues = [
    ...Object.values(DateFilterOperatorValues),
    ...Object.values(NullableExclusiveFilterOperatorValues),
];

export const NullableBoolFilterOperatorValues = [
    ...Object.values(BoolFilterOperatorValues),
    ...Object.values(NullableExclusiveFilterOperatorValues),
];