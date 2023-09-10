import { RequestDataRepoInterface } from "../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../request-data-processor";

export async function getRequestDataValueByKey(requestDataRepo: RequestDataRepoInterface, 
    requestDataProcessor: WorkflowRequestDataProcessorInterface , requestId: string, key: string): Promise<unknown> {
    const storedRequestData = await requestDataRepo.findOneByRequestIdAndName({
        requestId: requestId,
        name: key,
    });
    
    const originalDataValue = storedRequestData 
        ? requestDataProcessor.retrieveOriginalValue(storedRequestData.value) 
        : undefined;
    if (!storedRequestData) {
        return undefined;
    }
    
    return originalDataValue;
}