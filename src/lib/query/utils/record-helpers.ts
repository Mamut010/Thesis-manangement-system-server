import { merge } from "../../../utils/object-helpers";

export function mergeRecordsOfArray<T>(...records: Record<string, T[]>[]): Record<string, T[]> {
    return records.reduce((pre: Record<string, T[]>, record: Record<string, T[]>) => {
        Object.entries(record).forEach(([key, value]) => {
            const mergedValue = merge(pre[key], value);
            if (Array.isArray(mergedValue)) {
                pre[key] = mergedValue;
            }
            else {
                pre[key] = mergedValue ? [mergedValue] : [];
            }
        });
        return pre;
    }, {});
}