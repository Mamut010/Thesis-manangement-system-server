import { isDate } from "util/types";
import { capitalize, trimPrefix, uncapitalize } from "./string-helpers";
import { arrayIntersection, arrayUnion } from "./array-helpers";
import { ValueOf } from "./types";

/**
 * Make an object become immutable. This operation is irreversible.
 * @param obj The object to make immutable
 */
export function makeImmutable<T extends object>(obj: T): Readonly<T> {
    return Object.freeze<T>(obj);
}

export function isEnumerableObject(obj: unknown): obj is { [property: PropertyKey]: any } {
    return typeof obj === 'object' 
        && obj !== null
        && !Array.isArray(obj)
        && !isDateObject(obj);
}

export function isNullOrUndefined(obj: unknown): obj is null | undefined {
    return obj === null || typeof obj === 'undefined';
}

export function isDateObject(obj: unknown, strict?: boolean): obj is Date {
    if (strict) {
        return isDate(obj) && !isNaN(+obj);
    }
    else {
        return isDate(obj);
    }
}

/**
 * Check if a given object owns a property.
 * @param obj The object to operate on.
 * @param property The property to check for.
 * @returns True if the given object owns a property. Otherwise, false.
 */
export function objectHasOwnProperty<T extends object>(obj: T, property: PropertyKey): boolean{
    return Object.prototype.hasOwnProperty.call(obj, property);
}

export interface DefaultOrGivenOptions {
    skipNestedEnumeration?: string[] | boolean
}

export function defaultOrGiven<T>(defaulted: T, given?: T, options?: DefaultOrGivenOptions) {
    const result = { ...defaulted };
    if (!given) {
        return result;
    }

    for(const key in defaulted) {
        if (!objectHasOwnProperty(given, key)) {
            continue;
        }

        const givenValue = given[key];
        const skip = options?.skipNestedEnumeration;
        if(isEnumerableObject(givenValue) 
            && skip !== true 
            && !(Array.isArray(skip) && skip?.includes(key))) {
                result[key] = defaultOrGiven(defaulted[key], givenValue, options);
        }
        else {
            result[key] = givenValue;
        }
    }

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A transformer is used to transform key in inward and outward cases.
 * 
 * transformInward() and transformOutward() should produce reciprocal result.
 */
export interface KeyTransformer {
    /**
     *  E.g: 
     * 
     * { x: { yId, y: { id } } }
     */
    transformInward(key: string, innerProp: string): string;

    /**
     *  E.g: 
     * 
     * { x: { id, y: { xId } } }
     */
    transformOutward(key: string, outerProp: string): string;
}

export const DefaultCases = {
    camelCase: 'camelCase',
    snakeCase: 'snakeCase',
    pascalCase: 'pascalCase',
} as const;

export const DefaultKeyTransformers: { readonly [key in keyof typeof DefaultCases]: KeyTransformer } = {
    camelCase: {
        transformInward: (key: string, innerProp: string) => innerProp + capitalize(key),
        transformOutward: (key: string, outerProp: string) => uncapitalize(trimPrefix(key, outerProp)),
    },
    snakeCase: {
        transformInward: (key: string, innerProp: string) => innerProp + '_' + key,
        transformOutward: (key: string, outerProp: string) => trimPrefix(key, outerProp + '_'),
    },
    pascalCase: {
        transformInward: (key: string, innerProp: string) => capitalize(innerProp) + capitalize(key),
        transformOutward: (key: string, outerProp: string) => uncapitalize(trimPrefix(key, capitalize(outerProp))),
    }
} as const;

export interface FlatteningOptions {
    /**
     * Max nested level. Any property beyond this level is kept as is.
     * 
     * The level starts from 0.
     */
    maxDepth?: number,

    /**
     * If provided, this key is used as the initial prefix to check for duplicatie properties when flattening.
     */
    initialKey?: string,

    /**
     * If set to true, duplicate inner keys are transformed with KeyTransformer.transformInward() method 
     * instead of being discarded.
     */
    keepDuplicate?: boolean,

    /**
     * The transformer used to transform key in inward and outward cases.
     * 
     * @default DefaultCases.camelCase
     */
    keyTransformer?: KeyTransformer,

    /**
     * Properties to skip flattening and keep as is.
     */
    skip?: string[],

    /**
     * Keys of these properties are called with KeyTransformer.transformedInward() before flattening out.
     */
    transformedProps?: string[],

    /**
     * Work in tandem with 'transformedProps' option. If set, only properties on the specified depths are
     * subjects to be transformed.
     */
    transformedDepths?: number[],
}

/**
 * Flatten a nested object.
 * 
 * Note: Defaulted to using camelCase when dealing with properties' names.
 * @param obj The object to flatten.
 * @param flatteningOptions The options used for flattening process.
 * @returns The flattened object.
 */
export function flattenObject<T extends object>(obj: T, flatteningOptions?: FlatteningOptions): Record<string, any> {
    const defaultOptions: FlatteningOptions = {
        maxDepth: undefined,
        initialKey: undefined,
        keepDuplicate: undefined,
        keyTransformer: DefaultKeyTransformers['camelCase'],
        skip: undefined,
        transformedProps: undefined,
        transformedDepths: undefined,
    };

    const options = defaultOrGiven(defaultOptions, flatteningOptions);

    return flattenObjectImpl(obj, options, 0, options.initialKey);
}

function flattenObjectImpl<T extends object>(obj: T, flatteningOptions: FlatteningOptions, currentDepth: number, 
    currentProp?: string) {
    let flattened: Record<string, any> = {};
    const isNestable = flatteningOptions?.maxDepth ? currentDepth < flatteningOptions?.maxDepth : true;

    for(const key in obj) {
        const value = obj[key];

        if (isNestable 
            && !(currentDepth === 1 && flatteningOptions.skip?.includes(key))
            && isEnumerableObject(value)) {

            const nestedFlattened = flattenObjectImpl(value, flatteningOptions, currentDepth + 1, key);
            flattened = assignNestedFlattened(flatteningOptions, currentDepth, flattened, nestedFlattened, key, currentProp);
        }
        else {
            flattened[key] = value;
        }
    }

    return flattened;
}

function assignNestedFlattened<T extends object>(options: FlatteningOptions, depth: number, 
    targetFlattened: Record<string, any>, nestedFlattened: T, 
    nestedProp: string, targetProp?: string): Record<string, any> {
    const targetFlattenedObject: object = targetFlattened;
    const keyTransformer: KeyTransformer = options.keyTransformer!;
    const resultFlattened: Record<string, any> = { ...targetFlattened };

    for(const originalKey in nestedFlattened) {
        const value = nestedFlattened[originalKey];
        const inwardKey = keyTransformer.transformInward(originalKey, nestedProp);
        const key = shouldTransformInnerKey(options, depth, nestedProp) ? inwardKey : originalKey;

        // Case: 
        // {
        //    x: {
        //       id,
        //       y: {
        //          id,
        //       }
        //    }    
        // }
        if (objectHasOwnProperty(targetFlattenedObject, key)) {
            if (options.keepDuplicate 
                && targetFlattened[key] !== value
                && !objectHasOwnProperty(targetFlattenedObject, inwardKey)) {
                // Shape: 
                // {
                //    x: {
                //       id,
                //       yId,
                //    }    
                // }
                resultFlattened[inwardKey] = value;
            }
        }
        // Case: 
        // {
        //    x: {
        //       yId,
        //       y: {
        //          id,
        //       }
        //    }    
        // }
        else if (!objectHasOwnProperty(targetFlattenedObject, inwardKey)
        // Case: 
        // {
        //    x: {
        //       id,
        //       y: {
        //          xId,
        //       }
        //    }    
        // }
            && !(targetProp 
                && objectHasOwnProperty(targetFlattenedObject, keyTransformer.transformOutward(key, targetProp)))) {
            resultFlattened[key] = value;
        }
    }

    return resultFlattened;
}

function shouldTransformInnerKey(options: FlatteningOptions, depth: number, nestedProp: string) {
    return (!options.transformedDepths || options.transformedDepths.includes(depth))
        && options.transformedProps?.includes(nestedProp);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function flipMap<T extends PropertyKey, U extends Exclude<PropertyKey, symbol>>(map: Record<T, U>): Record<string, T> {
    return Object.fromEntries(
        Object
            .entries(map)
            .map(([key, value]) => [value, key])
    ) as Record<string, T>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type NestedNotatedObject<T> = { [property: string]: T | NestedNotatedObject<T> };

export function assignObjectByDotNotation<T>(obj: NestedNotatedObject<T>, dotNotation: string, value: T)
    : NestedNotatedObject<T> {
    const dot = '.'
    const nestedProps = dotNotation.split(dot);
    const result: NestedNotatedObject<T> = obj;
    let current: NestedNotatedObject<T> = result;
    let i = 0;
    while (i < nestedProps.length - 1) {
        const currentProp = nestedProps[i];
        const inner = objectHasOwnProperty(current, currentProp) ? current[currentProp] : {};
        current[currentProp] = inner;
        current = inner as Record<string, any>;
        i++;
    }
    current[nestedProps[i]] = value;
    return result;
}

export function createObjectByDotNotation<T>(dotNotation: string, value: T): NestedNotatedObject<T> {
    return assignObjectByDotNotation({}, dotNotation, value);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface CompareObjectOptions {
    ignoreUnmatchedProps?: boolean
}

export function compareObjectByEntries(obj1: Record<string, any>, obj2: Record<string, any>, 
    compareOptions?: CompareObjectOptions): boolean {
    const defaultOptions: CompareObjectOptions = {
        ignoreUnmatchedProps: false
    };
    const options = defaultOrGiven(defaultOptions, compareOptions);
    return compareObjectByEntriesImpl(obj1, obj2, options);
}

function compareObjectByEntriesImpl(obj1: Record<string, any>, obj2: Record<string, any>, 
    options: CompareObjectOptions): boolean {
    const key1s = Object.keys(obj1);
    const key2s = Object.keys(obj2);
    const keys = !options.ignoreUnmatchedProps 
        ? arrayUnion(key1s, key2s) 
        : arrayIntersection(key1s, key2s);
    for(const key of keys) {
        if (!(objectHasOwnProperty(obj1, key) && objectHasOwnProperty(obj2, key))) {
            return false;
        }

        const val1: unknown = obj1[key];
        const val2: unknown = obj2[key];

        if (val1 !== val2 && 
            (!compareObjectByEntriesImplCheckNonobject(val1, val2)
            || !compareObjectByEntriesImplCheckEnumerableObject(val1, val2, options)
            || !compareObjectByEntriesImplCheckArray(val1, val2, options)
            || !compareObjectByEntriesImplCheckDate(val1, val2, options))) {
            return false;
        }
    }

    return true;
}

function compareObjectByEntriesImplCheckNonobject(val1: unknown, val2: unknown) {
    let o1: unknown;
    let o2: unknown;
    let isChecked = false;
    if (typeof val1 !== 'object') {
        o1 = val1;
        o2 = val2;
        isChecked = true;
    }
    else {
        o1 = val2;
        o2 = val1;
    }

    if (isChecked || typeof o1 !== 'object') {
        if (o1 !== o2) {
            return false;
        }
    }
    return true;
}

function compareObjectByEntriesImplCheckEnumerableObject(val1: unknown, val2: unknown, options: CompareObjectOptions) {
    let o1: unknown;
    let o2: unknown;
    let isChecked = false;
    if (isEnumerableObject(val1)) {
        o1 = val1;
        o2 = val2;
        isChecked = true;
    }
    else {
        o1 = val2;
        o2 = val1;
    }

    const typeGuard = (o1: unknown): o1 is Record<string, any> => isChecked;
    
    if (typeGuard(o1) || isEnumerableObject(o1)) {
        if (!isEnumerableObject(o2) || !compareObjectByEntriesImpl(o1, o2, options)) {
            return false;
        }
    }
    return true;
}

function compareObjectByEntriesImplCheckArray(val1: unknown, val2: unknown, options: CompareObjectOptions) {
    let o1: unknown;
    let o2: unknown;
    let isChecked = false;
    if (Array.isArray(val1)) {
        o1 = val1;
        o2 = val2;
        isChecked = true;
    }
    else {
        o1 = val2;
        o2 = val1;
    }

    const typeGuard = (o1: unknown): o1 is unknown[] => isChecked;
    
    if(typeGuard(o1) || Array.isArray(o1)) {
        if (!Array.isArray(o2) || !arrayEqualsByEntries(o1, o2, (item1, item2) => 
            isEnumerableObject(item1) && isEnumerableObject(item2) && compareObjectByEntriesImpl(item1, item2, options))) {
            return false;
        }
    }
    return true;
}

function compareObjectByEntriesImplCheckDate(val1: unknown, val2: unknown, options: CompareObjectOptions) {
    let o1: unknown;
    let o2: unknown;
    let isChecked = false;
    if (isDateObject(val1)) {
        o1 = val1;
        o2 = val2;
        isChecked = true;
    }
    else {
        o1 = val2;
        o2 = val1;
    }

    const typeGuard = (o1: unknown): o1 is Date => isChecked;
    
    if(typeGuard(o1) || isDateObject(o1)) {
        if (!isDateObject(o2) || (+o1 !== +o2)) {
            return false;
        }
    }
    return true;
}

function arrayEqualsByEntries(arr1: unknown[], arr2: unknown[], 
    additionalCheck?: (item1: unknown, item2: unknown) => boolean) {
    return arr1.length === arr2.length && arr1.every((item1, index) => {
        const item2 = arr2[index];
        return item1 === item2 || additionalCheck?.(item1, item2);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function isObjectEmptyOrAllUndefined(obj: Record<string, any>, 
    validateNested: boolean = true): obj is Record<string, undefined> {
    for(const key in obj) {
        const value: unknown = obj[key];
        if (isEnumerableObject(value)) {
            return validateNested && isObjectEmptyOrAllUndefined(value, validateNested);
        }
        else if (value !== undefined) {
            return false;
        }
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type SingleOrArray<T> = T | T[];

export function singleOrArrayOrUndefined<T>(obj: SingleOrArray<T> | undefined) {
    if (Array.isArray(obj)) {
        if (obj.length > 1) {
            return obj;
        }
        else if(obj.length === 1) {
            return obj[0];
        }
        else {
            return undefined;
        }
    }
    else {
        return obj;
    }
}

export function merge<T>(...objs: (SingleOrArray<T> | undefined)[]): SingleOrArray<T> | undefined {
    const merged: T[] = objs.reduce((pre: T[], obj: SingleOrArray<T> | undefined) => {
        if (obj) {
            if (Array.isArray(obj)) {
                pre.push(...obj);
            }
            else {
                pre.push(obj);
            }  
        }
        return pre;
    }, []);

    return singleOrArrayOrUndefined(merged);
}

export function equalsOrUndefined<T>(undefinable: T | undefined, comparedTarget: T): boolean {
    return typeof undefinable !== 'undefined' ? undefinable === comparedTarget : true;
}

/**
 * JSON stringify a value. Circular refenrences are discarded.
 * @param value The value to stringify.
 * @param space The space passed directly to JSON.stringify().
 * @returns The stringified form of the value.
 * 
 * @note This may not work for array passed as value.
 */
export function jsonStringifyCircular(value: any, space?: string | number) {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key: string, value: unknown) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
    };

    return JSON.stringify(value, getCircularReplacer(), space);
}

export function valuesOf<T extends object>(obj: T): ValueOf<T>[] {
    return Object.values(obj) as ValueOf<T>[];
}