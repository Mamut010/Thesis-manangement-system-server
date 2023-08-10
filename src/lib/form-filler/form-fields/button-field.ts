import { FormField } from "../interfaces/form-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export abstract class ButtonField implements FormField {
    constructor(public name: string) {
        
    }

    abstract accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined): Promise<void>;
}