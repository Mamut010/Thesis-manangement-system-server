import { ValidateIf } from "class-validator";
import { BinaryOrListFilter, ValidatingRequest } from "../utils/types";
import { isNullableOperator } from "../utils/operator-helpers";

export function ValidateIfNotNullableOperator<T = never>(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
            ValidateIf((obj: ValidatingRequest<BinaryOrListFilter<T>>) => !isNullableOperator(obj.operator))
                    (target, propertyKey)
    };
}