import { SingleOrArray } from "./object-helpers";

export function arrayIntersection<T = unknown>(arr1: T[], arr2: T[]): T[] {
    const intersection = arr1.filter(value => arr2.includes(value));
    // Use Set to remove duplicates
    return Array.from(new Set(intersection));
}

export function arrayUnion<T = unknown>(arr1: T[], arr2: T[]): T[] {
    return Array.from(new Set([...arr1, ...arr2]));
}

export function makeArray<T = unknown>(value: SingleOrArray<T>): T[] {
    return Array.isArray(value) ? value : [value];
}

export function singleOrDefault<TValue>(arr: TValue[]): TValue | undefined;
export function singleOrDefault<TValue, TDefault>(arr: TValue[], defaultValue: TDefault): TValue | TDefault;
export function singleOrDefault<TValue, TDefault>(arr: TValue[], defaultValue?: TDefault) {
    if (typeof defaultValue === 'undefined') {
        return arr.length === 1 ? arr[0] : undefined;
    }
    else {
        return arr.length === 1 ? arr[0] : defaultValue;
    }
}

export function firstOrDefault<TValue>(arr: TValue[]): TValue | undefined;
export function firstOrDefault<TValue, TDefault>(arr: TValue[], defaultValue: TDefault): TValue | TDefault;
export function firstOrDefault<TValue, TDefault>(arr: TValue[], defaultValue?: TDefault) {
    if (typeof defaultValue === 'undefined') {
        return arr.length > 0 ? arr[0] : undefined;
    }
    else {
        return arr.length > 0 ? arr[0] : defaultValue;
    }
}