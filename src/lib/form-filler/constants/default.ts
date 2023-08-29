import { IMAGE_MIME_TYPES } from "../../../core/constants/mime-types";
import { DATETIME_FORMATS } from "./datetime";

export const DEFAULTS = {
    ImageMimeType: IMAGE_MIME_TYPES.Jpeg,
    DateFormat: DATETIME_FORMATS.DATE_LONG,
    Locale: 'vi-VN',
} as const;