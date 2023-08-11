import { RadioButtonField } from "../form-fields/radio-button-field";
import { TextField } from "../form-fields/text-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { PDFForm } from "pdf-lib";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";
import { CheckBoxField } from "../form-fields/check-box-field";
import { ImageButtonField } from "../form-fields/image-button-field";

export class PdfFormFieldHandler implements FormFieldHandler {
    constructor(public form: PDFForm) {

    }

    async handleText(formField: TextField, handleOptions?: FormFieldHandleOptions): Promise<void> {
        const handle = () => {
            const textField = this.form.getTextField(formField.name);
            textField.setText(formField.value);
        }
        
        return this.wrapErr(handle, handleOptions);
    }

    async handleCheckBox(formField: CheckBoxField, handleOptions?: FormFieldHandleOptions): Promise<void> {
        const handle = () => {
            const checkBox = this.form.getCheckBox(formField.name);
            if (formField.isChecked) {
                checkBox.check();
            }
            else {
                checkBox.uncheck();
            }
        }
        
        return this.wrapErr(handle, handleOptions);
    }

    async handleRadioButton(formField: RadioButtonField, handleOptions?: FormFieldHandleOptions): Promise<void> {
        const handle = () => {
            const radioGroup = this.form.getRadioGroup(formField.groupName);
            
            const isValidTargetOption = (targetOption?: string): targetOption is string => {
                return radioGroup.getOptions().some(option => option === targetOption);
            }

            if (isValidTargetOption(formField.option)) {
                radioGroup.select(formField.option);
            }
            else {
                radioGroup.clear();
            }
        }
        
        return this.wrapErr(handle, handleOptions);
    }

    async handleImageButton(formField: ImageButtonField, handleOptions?: FormFieldHandleOptions | undefined)
        : Promise<void> {
        const handle = async () => {
            const pdfDoc = this.form.doc;
            const image = formField.imageType === 'png' 
                ? await pdfDoc.embedPng(formField.image)
                : await pdfDoc.embedJpg(formField.image); 

            const button = this.form.getButton(formField.name);
            button.setImage(image);
        }
        
        return await this.wrapErr(handle, handleOptions);
    }

    private wrapErr<T>(fn: () => T, handleOptions?: FormFieldHandleOptions) {
        try {
            return fn.call(this);
        }
        catch(err) {
            if (handleOptions?.rejectOnFail) {
                throw err;
            }
        }
    }
}