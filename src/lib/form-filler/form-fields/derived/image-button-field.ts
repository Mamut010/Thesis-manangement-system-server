import { ImageMimeType } from "../../../../core/constants/mime-types";
import { DEFAULTS } from "../../constants/default";
import { FormFieldHandler } from "../../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../../types/form-field-handle-options";
import { ButtonField } from "../basic/button-field";

export class ImageButtonField extends ButtonField {
    constructor(
        name: string, 
        public image?: string | Uint8Array | ArrayBuffer | null, 
        public mimeType: ImageMimeType = DEFAULTS.ImageMimeType) {
        super(name);
    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined) {
        return handler.handleImageButton(this, handleOptions);
    }
}