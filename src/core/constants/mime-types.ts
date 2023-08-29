export const IMAGE_MIME_TYPES = {
    Png: 'image/png',
    Jpg: 'image/jpeg',
    Jpeg: 'image/jpeg',
} as const;

export const APPLICATION_MIME_TYPES = {
    Pdf: 'application/pdf',
} as const;

export const MIME_TYPES = {
    ...IMAGE_MIME_TYPES,
    ...APPLICATION_MIME_TYPES,
} as const;