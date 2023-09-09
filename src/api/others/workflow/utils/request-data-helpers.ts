import { RequestDataRepoInterface } from "../../../../dal/interfaces";

export function makeStoredDataValue(value: unknown): string {
    return JSON.stringify(value);
}

export function getOriginalDataValue<T = unknown>(value: string): T {
    return JSON.parse(value) as T;
}

export async function getRequestDataValueByKey(requestDataRepo: RequestDataRepoInterface, requestId: string, key: string)
    : Promise<unknown> {
    const storedRequestData = await requestDataRepo.findOneByRequestIdAndName({
        requestId: requestId,
        name: key,
    });
    
    const originalDataValue = storedRequestData ? getOriginalDataValue(storedRequestData.value) : undefined;
    if (!storedRequestData) {
        return undefined;
    }
    
    return originalDataValue;
}