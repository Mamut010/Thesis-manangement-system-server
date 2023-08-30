import { ValueOf } from "../../utils/types";

export const ImageMimeType = {
    Png: 'image/png',
    Jpg: 'image/jpeg',
    Jpeg: 'image/jpeg',
} as const;

export const ApplicationMimeType = {
    Pdf: 'application/pdf',
} as const;

export const MimeType = {
    ...ImageMimeType,
    ...ApplicationMimeType,
} as const;

export type ImageMimeType = ValueOf<typeof ImageMimeType>;
export type ApplicationMimeType = ValueOf<typeof ApplicationMimeType>;
export type MimeType = ValueOf<typeof MimeType>;