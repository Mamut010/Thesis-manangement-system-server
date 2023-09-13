import { STORED_INDIVIDUAL_REQUEST_DATA_KEYS } from "../constants/request-data-keys";
import { Target } from "../types/targets";
import { RequestDataDeps } from "../types/utility-types";

export async function getRequestDataValueByKey(requestId: string, key: string, requestDataDeps: RequestDataDeps): Promise<unknown> {
    const storedRequestData = await requestDataDeps.repo.findOneByRequestIdAndName({
        requestId: requestId,
        name: key,
    });
    
    const originalDataValue = storedRequestData 
        ? requestDataDeps.processor.retrieveOriginalValue(storedRequestData.value) 
        : undefined;
    if (!storedRequestData) {
        return undefined;
    }
    
    return originalDataValue;
}

export async function getRequestDataStringValueByKey(requestId: string, key: string, requestDataDeps: RequestDataDeps)
    : Promise<string | undefined> {
    const value = await getRequestDataValueByKey(requestId, key, requestDataDeps);
    return typeof value === 'string' ? value : undefined
}

export function getIndividualDataKeyByTarget(target: Target): string | undefined {
    switch(target) {
        case Target.Supervisor1: return STORED_INDIVIDUAL_REQUEST_DATA_KEYS.Supervisor1;
        case Target.Supervisor2: return STORED_INDIVIDUAL_REQUEST_DATA_KEYS.Supervisor2;
    }
}

export async function upsertRequestData(requestId: string, key: string, value: string, requestDataDeps: RequestDataDeps) {
    await requestDataDeps.repo.upsert(requestId, {
        name: key,
        value: requestDataDeps.processor.makeStoredValue(value)
    });
}