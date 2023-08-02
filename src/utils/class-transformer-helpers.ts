import { ClassConstructor, instanceToPlain, plainToInstance } from "class-transformer";

export function plainToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: V, exposeDefaultValues = true): T {
    return plainToInstance<T, V>(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false, exposeDefaultValues });
}

export function plainArrayToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: V[], exposeDefaultValues = true): T[] {
    return plainToInstance<T, V>(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false, exposeDefaultValues });
}

export function instanceToPlainSkipUnset<T>(object: T, exposeDefaultValues = true): Record<string, any> {
    return instanceToPlain<T>(object, { exposeUnsetFields: false, exposeDefaultValues });
}

export function instanceArrayToPlainSkipUnset<T>(object: T[], exposeDefaultValues = true): Record<string, any>[] {
    return instanceToPlain<T>(object, { exposeUnsetFields: false, exposeDefaultValues });
}