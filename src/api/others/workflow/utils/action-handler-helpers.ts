import { SPECIFIC_REQUEST_DATA_KEYS } from "../constants/request-data-keys";

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