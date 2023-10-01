export function isValidFormUpdate<T extends object>(updateRequest: T, updatableFields: readonly string[]) {
    const updatableFieldSet = new Set(updatableFields);
    
    return Object.entries(updateRequest).every(([field, newValue]) => {
        return typeof newValue === 'undefined' || updatableFieldSet.has(field);
    });
}