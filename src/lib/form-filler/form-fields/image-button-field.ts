import { FormFieldHandler } from "../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";
import { SupportedImageType } from "../types/supported-image-type";
import { ButtonField } from "./button-field";

export class ImageButtonField extends ButtonField {
    constructor(
        name: string, 
        public image?: string | Uint8Array | ArrayBuffer | null, 
        public imageType?: SupportedImageType) {
        super(name);
    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined) {
        return handler.handleImageButton(this, handleOptions);
    }
}