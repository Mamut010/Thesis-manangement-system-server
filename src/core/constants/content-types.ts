import { ValueOf } from "../../utils/types";

export const ContentType = {
    Any: '*/*',
    ApplicationAny: 'application/*',
    ApplicationPdf: 'application/pdf',
    ApplicationJson: 'application/json',
    ApplicationOctetStream: 'application/octet-stream',
    TextPlain: 'text/plain',
    TextHtml: 'text/html',
    MultipartFormData: 'multipart/form-data',
} as const;

export type ContentType = ValueOf<typeof ContentType>;