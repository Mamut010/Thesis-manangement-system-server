import { FormFieldHandleOptions } from "../types/form-field-handle-options";
import { FormFieldHandler } from "./form-field-handler";

export interface FormField {
    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions): Promise<void> | void;
}