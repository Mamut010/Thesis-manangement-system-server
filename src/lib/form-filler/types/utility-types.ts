import { SUPPORTED_IMAGE_TYPES } from "../constants/images";

export type SupportedImageType = typeof SUPPORTED_IMAGE_TYPES[keyof typeof SUPPORTED_IMAGE_TYPES];
export interface NumberFieldOptions {
    locale?: string, 
    format?: Intl.NumberFormatOptions,
}

export interface DateFieldOptions {
    locale?: string, 
    format?: Intl.DateTimeFormatOptions,
}