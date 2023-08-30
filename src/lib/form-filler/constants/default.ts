import { ImageMimeType } from "../../../core/constants/mime-types";
import { DATETIME_FORMATS } from "./datetime";

export const DEFAULTS = {
    ImageMimeType: ImageMimeType.Jpeg,
    DateFormat: DATETIME_FORMATS.DateLong,
    Locale: 'vi-VN',
} as const;