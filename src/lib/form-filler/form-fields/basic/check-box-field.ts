import { FormField } from "../../interfaces/form-field";
import { FormFieldHandler } from "../../interfaces/form-field-handler";
import { FormFieldHandleOptions } from "../../types/form-field-handle-options";

export class CheckBoxField implements FormField {
    constructor(public name: string, public isChecked?: boolean | null) {

    }

    accept(handler: FormFieldHandler, handleOptions?: FormFieldHandleOptions | undefined) {
        return handler.handleCheckBox(this, handleOptions);
    }
}