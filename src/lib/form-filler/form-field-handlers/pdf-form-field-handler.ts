import { RadioButtonField } from "../form-fields/radio-button-field";
import { TextField } from "../form-fields/text-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { PDFForm } from "pdf-lib";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";

export class PdfFormFieldHandler implements FormFieldHandler {
    constructor(public form: PDFForm) {

    }

    handleText(formField: TextField, handleOptions?: FormFieldHandleOptions): void {
        console.log(`Fill text field <name = ${formField.name}; value = ${formField.value}> for PDF`);
        const handle = () => {
            const textField = this.form.getTextField(formField.name);
            textField.setText(formField.value);
        }
        
        this.wrapErr(handle, handleOptions);
    }

    handleRadioButton(formField: RadioButtonField, handleOptions?: FormFieldHandleOptions): void {
        console.log(`Fill radio button <groupName = ${formField.groupName}; option = ${formField.option}> for PDF`);
        const handle = () => {
            const radioButtonField = this.form.getRadioGroup(formField.groupName);
            radioButtonField.select(formField.option ?? '');
        }
        
        this.wrapErr(handle, handleOptions);
    }

    private wrapErr(fn: () => any, handleOptions?: FormFieldHandleOptions) {
        try {
            fn.bind(this)();
        }
        catch(err) {
            if (handleOptions?.rejectOnFail) {
                throw err;
            }
        }
    }
}