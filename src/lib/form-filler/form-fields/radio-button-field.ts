import { FormField } from "../interfaces/form-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export class RadioButtonField implements FormField {
    constructor(public groupName: string, public option?: string | null) {

    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined): Promise<void> {
        return handler.handleRadioButton(this, handleOptions);
    }
}