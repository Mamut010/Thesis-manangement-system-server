import { ERROR_MESSAGES } from "../../../../contracts/constants/error-messages";
import { UnexpectedError } from "../../../../contracts/errors/unexpected.error";
import { SPECIFIC_REQUEST_DATA_KEYS, STORED_REQUEST_DATA_KEYS } from "../constants/request-data-keys";
import { RequestDataDeps } from "../types/utility-types";
import { getRequestDataValueByKey } from "./request-data-helpers";

export function getTitleAndContentFromData(data?: Record<string, unknown>) {
    let title = data?.[SPECIFIC_REQUEST_DATA_KEYS.Inform.Title];
    let content = data?.[SPECIFIC_REQUEST_DATA_KEYS.Inform.Content];
    title = typeof title === 'string' ? title : undefined;
    content = typeof content === 'string' ? content : undefined;

    return {
        title: title as string | undefined,
        content: content as string | undefined,
    }
}

export async function getAttemptNoFromRequestData(requestId: string, requestDataDeps: RequestDataDeps): Promise<number | undefined> {
    const attemptNo = await getRequestDataValueByKey(requestId, STORED_REQUEST_DATA_KEYS.AttemptNo, requestDataDeps);
    return typeof attemptNo === 'number' ? attemptNo : undefined;
}