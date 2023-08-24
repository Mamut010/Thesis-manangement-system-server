import { Expose, Transform, Type, TypeHelpOptions } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { makeArray } from "../utils/array-helpers";

export const optionalNestedDecoratorFactory = (typeFunction?: (type?: TypeHelpOptions) => Function, isArray?: boolean) => {
    return (): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
        Type(typeFunction)(target, propertyKey);
        ValidateNested({ each: isArray })(target, propertyKey);
        IsOptional()(target, propertyKey);
        Expose()(target, propertyKey);
        if (isArray) {
            Transform(({ value }) => makeArray<unknown>(value))(target, propertyKey);
        }
    };
}