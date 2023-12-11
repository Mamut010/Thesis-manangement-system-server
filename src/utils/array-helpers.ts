import { SingleOrArray, isNullOrUndefined, jsonStringifyCircular } from "./object-helpers";

function getAllAndSharedElements<T = unknown>(arr1: T[], arr2: T[]) {
    const elementSet = new Set(arr1);
    const sharedElements = new Set<T>();
    for(const element of arr2) {
        if (elementSet.has(element)) {
            sharedElements.add(element);
        }
        else {
            elementSet.add(element);
        }
    }
    return {
        elements: elementSet,
        sharedElements: sharedElements,
    }
}

export function arrayIntersection<T = unknown>(arr1: T[], arr2: T[], discardDuplicates: boolean = true): T[] {
    const { sharedElements } = getAllAndSharedElements(arr1, arr2);

    return discardDuplicates 
        ? Array.from(sharedElements) 
        : arr1.filter(value => sharedElements.has(value));
}

export function arrayUnion<T = unknown>(arr1: T[], arr2: T[], discardDuplicates: boolean = true): T[] {
    const union = [...arr1, ...arr2];
    return discardDuplicates ? removeDuplicates(union) : union;
}

export function uniqueFrom<T>(src: T[], toCheckAgainst: T[], discardDuplicates: boolean = true): T[] {
    const { sharedElements } = getAllAndSharedElements(src, toCheckAgainst);
    const result = src.filter(element => !sharedElements.has(element));
    return discardDuplicates ? removeDuplicates(result) : result;
}

/**
 * Make an array from a single value or an existing array.
 * @param value The single value or array.
 * @returns An array containing the single value or the original array.
 */
export function makeArray<T = unknown>(value: SingleOrArray<T>): T[] {
    return Array.isArray(value) ? value : [value];
}

export function removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
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

export function lastOrDefault<TValue>(arr: TValue[]): TValue | undefined;
export function lastOrDefault<TValue, TDefault>(arr: TValue[], defaultValue: TDefault): TValue | TDefault;
export function lastOrDefault<TValue, TDefault>(arr: TValue[], defaultValue?: TDefault) {
    const lastIndex = arr.length - 1;
    if (typeof defaultValue === 'undefined') {
        return arr.length > 0 ? arr[lastIndex] : undefined;
    }
    else {
        return arr.length > 0 ? arr[lastIndex] : defaultValue;
    }
}

export function singleOrThrow<TValue>(arr: TValue[]): TValue {
    if (arr.length !== 1) {
        throw new Error('Array is not single');
    }
    return arr[0];
}

export function firstOrThrow<TValue>(arr: TValue[]): TValue {
    if (arr.length === 0) {
        throw new Error('Array is empty');
    }
    return arr[0];
}

export function lastOrThrow<TValue>(arr: TValue[]): TValue {
    if (arr.length === 0) {
        throw new Error('Array is empty');
    }
    return arr[arr.length - 1];
}

/**
 * Group array by a key or an array of keys. May not work correctly on objects having circular-referenced values.
 * @param items The array.
 * @param key The key to perform group by operation.
 * @returns The map containing grouped-by array.
 * 
 * @see https://stackoverflow.com/questions/65184643/groupby-that-is-typescript-safe/65184754#65184754
 */
export function groupBy<TItem extends Record<PropertyKey, unknown>, K extends keyof TItem>(items: TItem[], key: K)
    : Map<TItem[K], TItem[]>;
export function groupBy<TItem extends Record<PropertyKey, unknown>, K extends keyof TItem>(items: TItem[], key: K[])
    : Map<Record<K, TItem[K]>, TItem[]>;
export function groupBy<TItem extends Record<PropertyKey, unknown>, K extends keyof TItem>(items: TItem[], key: SingleOrArray<K>)
    : Map<TItem[K], TItem[]> | Map<Record<K, TItem[K]>, TItem[]> {
    if (Array.isArray(key)) {
        return groupByKeyArray(items, key);
    }
    else {
        return groupBySingleKey(items, key);
    }
}

function groupBySingleKey<TItem extends Record<PropertyKey, unknown>, K extends keyof TItem>(items: TItem[], key: K)
    : Map<TItem[K], TItem[]> {
    return items.reduce(
        (result, item) => {
            const value = item[key];
            const storedItems = result.get(value);
            if (storedItems) {
                storedItems.push(item);
            }
            else {
                result.set(value, [item]);
            }

            return result;
        },
        new Map<TItem[K], TItem[]>()
    );
}

function groupByKeyArray<TItem extends Record<PropertyKey, unknown>, K extends keyof TItem>(items: TItem[], keys: K[])
    : Map<Record<K, TItem[K]>, TItem[]> {
    // As Record by itself is compared by reference, we must first use an intermediate representation of the Record+
    // which is the stringified form
    const intermediateMap = items.reduce(
        (result, item) => {
            const keyValues = keys.reduce((keyValues, key) => {
                keyValues[key] = item[key];
                return keyValues; 
            }, {} as Record<K, TItem[K]>);
            
            // Sort keys to ensure consistent stringified forms
            const sortedKeyValues = Object.fromEntries(
                Object.entries(keyValues).sort(([p1,], [p2,]) => {
                    if (p1 < p2) return -1;
                    else if (p1 > p2) return 1;
                    else return 0;
                })
            );
            const keyValuesSymbol = Symbol.for(jsonStringifyCircular(sortedKeyValues));

            const groupedItems = result.get(keyValuesSymbol);
            if (groupedItems) {
                groupedItems.records.push(item);
            }
            else {
                result.set(keyValuesSymbol, { keyValues, records: [item] });
            }

            return result;
        },
        new Map<symbol, {keyValues: Record<K, TItem[K]>, records: TItem[]}>()
    );

    const result = new Map<Record<K, TItem[K]>, TItem[]>();
    for(const value of intermediateMap.values()) {
        result.set(value.keyValues, value.records);
    }
    return result;
}

export function removeSharedElements<T>(arr1: T[] | undefined, arr2: T[] | undefined) {
    if (!arr1 || !arr2) {
        return { arr1, arr2 };
    }

    const { sharedElements } = getAllAndSharedElements(arr1, arr2);

    const resultArr1 = arr1.filter(element => !sharedElements.has(element));
    const resultArr2 = arr2.filter(element => !sharedElements.has(element));
    return {
        arr1: resultArr1,
        arr2: resultArr2,
    }
}

export function sortByKeyArray<T, U>(src: T[], keyArray: U[], keySelector: (item: T) => U, inplace: boolean = true): T[] {
    const positionDict = keyArray.reduce((dict, item, index) => {
        dict.set(item, index);
        return dict;
    }, new Map<U, number>());

    const arr = inplace ? src : [...src];
    
    return arr.sort((a, b) => {
        const aPos = positionDict.get(keySelector(a)); 
        const bPos = positionDict.get(keySelector(b));
        const hasAPos = typeof aPos !== 'undefined';
        const hasBPos = typeof bPos !== 'undefined';

        if (!hasAPos && !hasBPos) {
            return 0;
        }
        else if (!hasAPos) {
            return 1
        }
        else if (!hasBPos) {
            return -1
        }

        return aPos - bPos;
    });
}

export function getNonNullableKeys<T, V>(src: T[], keySelector: (item: T) => V | null | undefined): NonNullable<V>[] {
    return src
        .map(item => keySelector(item))
        .filter((key): key is NonNullable<typeof key> => !isNullOrUndefined(key));
}