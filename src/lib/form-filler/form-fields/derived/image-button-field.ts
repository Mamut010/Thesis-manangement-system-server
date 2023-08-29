import { IMAGE_MIME_TYPES } from "../../../../core/constants/mime-types";
import { IMAGE_MIME_TYPE } from "../../../../shared/types/mime-type";
import { FormFieldHandler } from "../../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../../types/form-field-handle-options";
import { ButtonField } from "../basic/button-field";

export class ImageButtonField extends ButtonField {
    constructor(
        name: string, 
        public image?: string | Uint8Array | ArrayBuffer | null, 
        public mimeType: IMAGE_MIME_TYPE = IMAGE_MIME_TYPES.Jpeg) {
        super(name);
    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined) {
        return handler.handleImageButton(this, handleOptions);
    }
}