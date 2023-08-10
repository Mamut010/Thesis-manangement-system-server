import { RadioButtonField } from "../form-fields/radio-button-field";
import { TextField } from "../form-fields/text-field";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export interface FormFieldHandler {
    handleText(formField: TextField, handleOptions?: FormFieldHandleOptions): void;
    handleRadioButton(formField: RadioButtonField, handleOptions?: FormFieldHandleOptions): void;
}