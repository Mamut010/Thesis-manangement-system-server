import { compareObjectByEntries, isObjectEmptyOrAllUndefined } from "./object-helpers";

export function anyChanges<T extends Record<string, any>, U extends Record<string, any>>
    (existingRecord: T, updateRequest: U): boolean {
    return !isObjectEmptyOrAllUndefined(updateRequest) 
        && !compareObjectByEntries(existingRecord, updateRequest, { ignoreUnmatchedProps: true });
}