import { ClassConstructor, instanceToPlain, plainToInstance } from "class-transformer";

export function plainToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance<T, V>(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false });
}

export function plainArrayToInstanceExactMatch<T, V>(cls: ClassConstructor<T>, plain: V[]): T[] {
    return plainToInstance<T, V>(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false });
}

export function instanceToPlainSkipUnset<T>(object: T): Record<string, any> {
    return instanceToPlain<T>(object, { exposeUnsetFields: false });
}

export function instanceArrayToPlainSkipUnset<T>(object: T[]): Record<string, any>[] {
    return instanceToPlain<T>(object, { exposeUnsetFields: false });
}