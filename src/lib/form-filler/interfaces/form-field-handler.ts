import { CheckBoxField } from "../form-fields/check-box-field";
import { ImageButtonField } from "../form-fields/image-button-field";
import { RadioButtonField } from "../form-fields/radio-button-field";
import { TextField } from "../form-fields/text-field";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export interface FormFieldHandler {
    handleText(formField: TextField, handleOptions?: FormFieldHandleOptions): Promise<void>;
    handleCheckBox(formField: CheckBoxField, handleOptions?: FormFieldHandleOptions): Promise<void>;
    handleRadioButton(formField: RadioButtonField, handleOptions?: FormFieldHandleOptions): Promise<void>;
    handleImageButton(formField: ImageButtonField, handleOptions?: FormFieldHandleOptions): Promise<void>;
}