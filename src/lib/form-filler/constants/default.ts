import { DATETIME_FORMATS } from "./datetime";
import { SUPPORTED_IMAGE_TYPES } from "./images";

export const DEFAULTS = {
    ImageType: SUPPORTED_IMAGE_TYPES.Jpeg,
    DateFormat: DATETIME_FORMATS.DATE_LONG,
    Locale: 'vi-VN',
} as const;