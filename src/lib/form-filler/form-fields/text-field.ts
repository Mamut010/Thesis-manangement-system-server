import { FormField } from "../interfaces/form-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export class TextField implements FormField {
    constructor(public name: string, public value?: string | null) {
        
    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined) {
        return handler.handleText(this, handleOptions);
    }
}