import { ERROR_MESSAGES } from "../contracts/constants/error-messages";
import { UnexpectedError } from "../contracts/errors/unexpected.error";
import { ProcessesQueryRequest } from "../contracts/requests";
import { ProcessRepoInterface } from "../dal/interfaces";
import { ProcessDto } from "../shared/dtos";
import { firstOrDefault } from "./array-helpers";

export async function getThesisProcessOrThrow(processRepo: ProcessRepoInterface): Promise<ProcessDto> {
    const processesQuery = new ProcessesQueryRequest();
    const queryResponse = await processRepo.query(processesQuery);
    
    // For now, just assume that the very first process is the thesis management process
    const process = firstOrDefault(queryResponse.content);
    if (!process) {
        throw new UnexpectedError(ERROR_MESSAGES.Unexpected.ThesisProcessRetrievalFailed);
    }
    return process;
}