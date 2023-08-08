import { isNullableOperator } from "./operator-helpers";
import { BinaryOrListFilter, ValidatingRequest } from "./types";

export const ValidateIfNotNullableOperator = <T = never>(o: ValidatingRequest<BinaryOrListFilter<T>>) => {
    return !isNullableOperator(o.operator);
}
