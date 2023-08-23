import { CheckBoxField } from "../form-fields/basic/check-box-field";
import { ImageButtonField } from "../form-fields/derived/image-button-field";
import { RadioButtonField } from "../form-fields/basic/radio-button-field";
import { TextField } from "../form-fields/basic/text-field";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export interface FormFieldHandler {
    handleText(formField: TextField, handleOptions?: FormFieldHandleOptions): Promise<void> | void;
    handleCheckBox(formField: CheckBoxField, handleOptions?: FormFieldHandleOptions): Promise<void> | void;
    handleRadioButton(formField: RadioButtonField, handleOptions?: FormFieldHandleOptions): Promise<void> | void;
    handleImageButton(formField: ImageButtonField, handleOptions?: FormFieldHandleOptions): Promise<void> | void;
}