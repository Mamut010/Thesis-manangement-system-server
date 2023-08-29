import { SingleOrArray, jsonStringifyCircular } from "./object-helpers";

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

/**
 * Group array by a key or an array of keys. May not work correctly on objects having circular-referenced values.
 * @param items The array.
 * @param key The key to perform group by operation.
 * @returns The map containing grouped-by array.
 * 
 * @see https://stackoverflow.com/questions/65184643/groupby-that-is-typescript-safe/65184754#65184754
 */
export function groupBy<K extends PropertyKey, TItem extends Record<K, unknown>>(items: TItem[], key: K)
    : Map<unknown, TItem[]>;
export function groupBy<K extends PropertyKey, TItem extends Record<K, unknown>>(items: TItem[], key: K[])
    : Map<Record<K, unknown>, TItem[]>;
export function groupBy<K extends PropertyKey, TItem extends Record<K, unknown>>(items: TItem[], key: SingleOrArray<K>)
    : Map<unknown, TItem[]> | Map<Record<K, unknown>, TItem[]> {
    if (Array.isArray(key)) {
        return groupByKeyArray(items, key);
    }
    else {
        return groupBySingleKey(items, key);
    }
}

function groupBySingleKey<K extends PropertyKey, TItem extends Record<K, unknown>>(items: TItem[], key: K)
    : Map<unknown, TItem[]> {
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
        new Map<unknown, TItem[]>()
    );
}

function groupByKeyArray<K extends PropertyKey, TItem extends Record<K, unknown>>(items: TItem[], keys: K[])
    : Map<Record<K, unknown>, TItem[]> {
    // As Record by itself is compared by reference, we must first use an intermediate representation of the Record+
    // which is the stringified form
    const intermediateMap = items.reduce(
        (result, item) => {
            const keyValues = keys.reduce((keyValues, key) => {
                keyValues[key] = item[key];
                return keyValues; 
            }, {} as Record<K, unknown>);
            
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
        new Map<Symbol, {keyValues: Record<K, unknown>, records: TItem[]}>()
    );

    const result = new Map<Record<K, unknown>, TItem[]>();
    for(const value of intermediateMap.values()) {
        result.set(value.keyValues, value.records);
    }
    return result;
}