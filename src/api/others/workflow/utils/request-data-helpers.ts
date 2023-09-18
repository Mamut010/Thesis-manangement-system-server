import { makeArray } from "../../../../utils/array-helpers";
import { STORED_INDIVIDUAL_REQUEST_DATA_KEYS } from "../constants/request-data-keys";
import { Target } from "../types/targets";
import { KeyValuePair, RequestDataDeps } from "../types/utility-types";

export async function getRequestDataValueByKey(requestId: string, key: string, requestDataDeps: RequestDataDeps): Promise<unknown> {
    const storedRequestData = await requestDataDeps.repo.findOneByRequestIdAndName({
        requestId: requestId,
        name: key,
    });
    
    return storedRequestData
        ? requestDataDeps.processor.retrieveOriginalValue(storedRequestData.value)
        : undefined;
}

export async function getRequestDataValuesByKeys(requestId: string, keys: string[], requestDataDeps: RequestDataDeps)
    : Promise<Record<string, unknown>> {
    const storedRequestDatum = await requestDataDeps.repo.findMany(requestId, keys);
    const keySet = new Set(keys);
    return storedRequestDatum.reduce((result, item) => {
        if (keySet.has(item.name)) {
            result[item.name] = requestDataDeps.processor.retrieveOriginalValue(item.value);
        }
        return result;
    }, {} as Record<string, unknown>);
}

export async function getRequestDataStringValueByKey(requestId: string, key: string, requestDataDeps: RequestDataDeps)
    : Promise<string | undefined> {
    const value = await getRequestDataValueByKey(requestId, key, requestDataDeps);
    return typeof value === 'string' ? value : undefined
}

export async function getRequestDataStringValuesByKeys(requestId: string, keys: string[], requestDataDeps: RequestDataDeps)
    : Promise<Record<string, string>> {
    const dataRecord = await getRequestDataValuesByKeys(requestId, keys, requestDataDeps);
    return Object.entries(dataRecord)
        .reduce((result, item) => {
            if (typeof item[1] === 'string') {
                result[item[0]] = item[1];
            }
            return result;
        }, {} as Record<string, string>);
}

export function getIndividualDataKeyByTarget(target: Target): string | undefined {
    switch(target) {
        case Target.Supervisor1: return STORED_INDIVIDUAL_REQUEST_DATA_KEYS.Supervisor1;
        case Target.Supervisor2: return STORED_INDIVIDUAL_REQUEST_DATA_KEYS.Supervisor2;
    }
}

export async function upsertRequestData(requestId: string, keyValuePair: KeyValuePair | KeyValuePair[], requestDataDeps: RequestDataDeps) {
    const storableNameValuePairs = makeArray(keyValuePair).map(({ key, value }) => {
        return {
            name: key,
            value: requestDataDeps.processor.makeStoredValue(value)
        }
    });
    await requestDataDeps.repo.upsert(requestId, storableNameValuePairs);
}