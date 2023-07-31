"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObject = exports.pascalCaseKeyTransformer = exports.snakeCaseKeyTransformer = exports.camelCaseKeyTransformer = exports.objectHasOwnProperty = exports.makeImmutable = void 0;
const string_helpers_1 = require("./string-helpers");
/**
 * Make an object become immutable. This operation is irreversible.
 * @param obj The object to make immutable
 */
function makeImmutable(obj) {
    return Object.freeze(obj);
}
exports.makeImmutable = makeImmutable;
/**
 * Check if a given object owns a property.
 * @param obj The object to operate on.
 * @param property The property to check for.
 * @returns True if the given object owns a property. Otherwise, false.
 */
function objectHasOwnProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}
exports.objectHasOwnProperty = objectHasOwnProperty;
exports.camelCaseKeyTransformer = {
    transformInward: (key, innerProp) => innerProp + (0, string_helpers_1.capitalize)(key),
    transformOutward: (key, outerProp) => (0, string_helpers_1.uncapitalize)((0, string_helpers_1.trimPrefix)(key, outerProp)),
};
exports.snakeCaseKeyTransformer = {
    transformInward: (key, innerProp) => innerProp + '_' + key,
    transformOutward: (key, outerProp) => (0, string_helpers_1.trimPrefix)(key, `${outerProp}_`),
};
exports.pascalCaseKeyTransformer = {
    transformInward: (key, innerProp) => (0, string_helpers_1.capitalize)(innerProp) + (0, string_helpers_1.capitalize)(key),
    transformOutward: (key, outerProp) => (0, string_helpers_1.uncapitalize)((0, string_helpers_1.trimPrefix)(key, (0, string_helpers_1.capitalize)(outerProp))),
};
/**
 * Flatten a nested object.
 *
 * Note: Defaulted to using camelCase when dealing with properties' names.
 * @param obj The object to flatten.
 * @param flatteningOptions The options used for flattening process.
 * @returns The flattened object.
 */
function flattenObject(obj, flatteningOptions) {
    const defaultOptions = {
        keyTransformer: exports.camelCaseKeyTransformer,
    };
    let options;
    if (!flatteningOptions) {
        options = defaultOptions;
    }
    else {
        options = flatteningOptions;
        for (const key in defaultOptions) {
            options[key] =
                flatteningOptions[key]
                    ?? defaultOptions[key];
        }
    }
    return flattenObjectImpl(obj, options, 1, options.initialKey);
}
exports.flattenObject = flattenObject;
function flattenObjectImpl(obj, flatteningOptions, currentDepth, currentProp) {
    let flattened = {};
    const isNestable = flatteningOptions?.maxDepth ? currentDepth < flatteningOptions?.maxDepth : true;
    for (const key in obj) {
        const value = obj[key];
        if (isNestable
            && !(currentDepth === 1 && flatteningOptions.skip?.includes(key))
            && typeof value === 'object'
            && value !== null
            && !(value instanceof Date)) {
            const nestedFlattened = flattenObjectImpl(value, flatteningOptions, currentDepth + 1, key);
            flattened = assignNestedFlattened(flatteningOptions, currentDepth, flattened, nestedFlattened, key, currentProp);
        }
        else {
            flattened[key] = value;
        }
    }
    return flattened;
}
function assignNestedFlattened(options, depth, targetFlattened, nestedFlattened, nestedProp, targetProp) {
    const targetFlattenedObject = targetFlattened;
    const keyTransformer = options.keyTransformer;
    const resultFlattened = { ...targetFlattened };
    for (const key in nestedFlattened) {
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
function shouldTransformInnerKey(options, depth, nestedProp) {
    return (!options.transformedDepths || options.transformedDepths.includes(depth))
        && options.transformedProps?.includes(nestedProp);
}
//# sourceMappingURL=object-helpers.js.map