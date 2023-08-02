import { capitalize, trimPrefix, uncapitalize } from "./string-helpers";

/**
 * Make an object become immutable. This operation is irreversible.
 * @param obj The object to make immutable
 */
export function makeImmutable<T>(obj: T): Readonly<T> {
    return Object.freeze<T>(obj);
}

export function isEnumerableObject(obj: any): obj is { [property: PropertyKey]: any } {
    return typeof obj === 'object' 
        && obj !== null 
        && !Array.isArray(obj)
        && !(obj instanceof Date);
}

/**
 * Check if a given object owns a property.
 * @param obj The object to operate on.
 * @param property The property to check for.
 * @returns True if the given object owns a property. Otherwise, false.
 */
export function objectHasOwnProperty<T>(obj: T, property: PropertyKey): boolean {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

export interface DefaultOrGivenOptions {
    skipNestedEnumeration?: string[]
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
        if(isEnumerableObject(givenValue) && !options?.skipNestedEnumeration?.includes(key)) {
            result[key] = defaultOrGiven(defaulted[key], givenValue, options);
        }
        else {
            result[key] = givenValue;
        }
    }

    return result;
}

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
export function flattenObject<T>(obj: T, flatteningOptions?: FlatteningOptions): Record<string, any> {
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

function flattenObjectImpl<T>(obj: T, flatteningOptions: FlatteningOptions, currentDepth: number, currentProp?: string) {
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

function assignNestedFlattened<T>(options: FlatteningOptions, depth: number, targetFlattened: Record<string, any>, 
    nestedFlattened: T, nestedProp: string, targetProp?: string): Record<string, any> {
    const targetFlattenedObject: object = targetFlattened;
    const keyTransformer: KeyTransformer = options.keyTransformer!;
    const resultFlattened: Record<string, any> = { ...targetFlattened };

    for(const key in nestedFlattened) {
        const inwardKey = keyTransformer.transformInward(key, nestedProp);

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
                && targetFlattened[key] !== nestedFlattened[key] 
                && !objectHasOwnProperty(targetFlattenedObject, inwardKey)) {
                // Shape: 
                // {
                //    x: {
                //       id,
                //       yId,
                //    }    
                // }
                resultFlattened[inwardKey] = nestedFlattened[key];
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
            resultFlattened[shouldTransformInnerKey(options, depth, nestedProp) ? inwardKey : key] = nestedFlattened[key];
        }
    }

    return resultFlattened;
}

function shouldTransformInnerKey(options: FlatteningOptions, depth: number, nestedProp: string) {
    return (!options.transformedDepths || options.transformedDepths.includes(depth))
        && options.transformedProps?.includes(nestedProp);
}

export function flipMap<T extends PropertyKey, U extends PropertyKey>(map: Record<T, U>): Record<string, T> {
    return Object.fromEntries(
        Object
            .entries(map)
            .map(([key, value]) => [value, key])
    ) as Record<string, T>;
}

export type NestedNotatedObject<T> = { [property: string]: T | NestedNotatedObject<T> };

export function assignObjectByDotNotation<T>(obj: NestedNotatedObject<T>, dotNotation: string, value: T)
    : NestedNotatedObject<T> {
    const dot = '.'
    const nestedProps = dotNotation.split(dot);
    const result: NestedNotatedObject<T> = obj;
    let current: NestedNotatedObject<T> = result;
    let i = 0;
    while (i < nestedProps.length - 1) {
        const inner: NestedNotatedObject<T> = {};
        current[nestedProps[i]] = inner;
        current = inner;
        i++;
    }
    current[nestedProps[i]] = value;
    return result;
}

export function createObjectByDotNotation<T>(dotNotation: string, value: T): NestedNotatedObject<T> {
    return assignObjectByDotNotation({}, dotNotation, value);
}