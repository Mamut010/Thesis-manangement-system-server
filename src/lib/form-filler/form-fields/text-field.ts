import { FormField } from "../interfaces/form-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export class TextField implements FormField {
    constructor(public name: string, public value?: string) {
        
    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined): void {
        handler.handleText(this, handleOptions);
    }
}