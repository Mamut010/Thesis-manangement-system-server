import { SUPPORTED_IMAGE_TYPES } from "../constants/images";

export type SupportedImageType = typeof SUPPORTED_IMAGE_TYPES[keyof typeof SUPPORTED_IMAGE_TYPES];