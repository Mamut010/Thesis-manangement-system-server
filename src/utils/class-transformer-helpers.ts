import { ClassConstructor, instanceToPlain, plainToInstance } from "class-transformer";
import { SingleOrArray } from "./object-helpers";

export function plainToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: V, exposeDefaultValues?: boolean): T;
export function plainToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: V[], exposeDefaultValues?: boolean): T[];
export function plainToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: SingleOrArray<V>, 
    exposeDefaultValues = true): SingleOrArray<T> {
    return plainToInstance(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false, exposeDefaultValues });
}

export function instanceToPlainSkipUnset<T>(object: T, exposeDefaultValues?: boolean): Record<string, any>;
export function instanceToPlainSkipUnset<T>(object: T[], exposeDefaultValues?: boolean): Record<string, any>[];
export function instanceToPlainSkipUnset<T>(object: SingleOrArray<T>, exposeDefaultValues = true)
    : SingleOrArray<Record<string, any>> {
    return instanceToPlain(object, { exposeUnsetFields: false, exposeDefaultValues });
}