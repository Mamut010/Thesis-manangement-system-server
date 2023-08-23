import { RadioButtonField } from "../form-fields/basic/radio-button-field";
import { TextField } from "../form-fields/basic/text-field";
import { FormFieldHandler } from "../interfaces/form-field-handler";
import { PDFForm } from "pdf-lib";
import { FormFieldHandleOptions } from "../types/form-field-handle-options";
import { CheckBoxField } from "../form-fields/basic/check-box-field";
import { ImageButtonField } from "../form-fields/derived/image-button-field";
import { SUPPORTED_IMAGE_TYPES } from "../constants/images";

export class PdfFormFieldHandler implements FormFieldHandler {
    constructor(public form: PDFForm) {

    }

    handleText(formField: TextField, handleOptions?: FormFieldHandleOptions): void {
        const handle = () => {
            const textField = this.form.getTextField(formField.name);
            textField.setText(formField.value ?? undefined);
        }
        
        return this.wrapErr(handle, handleOptions);
    }

    handleCheckBox(formField: CheckBoxField, handleOptions?: FormFieldHandleOptions): void {
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

    handleRadioButton(formField: RadioButtonField, handleOptions?: FormFieldHandleOptions): void {
        const handle = () => {
            const radioGroup = this.form.getRadioGroup(formField.groupName);
            
            const isValidTargetOption = (targetOption?: string | null): targetOption is string => {
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
            const button = this.form.getButton(formField.name);
            if (!formField.image) {
                this.form.removeField(button);
                return;
            }
            if (!formField.imageType) {
                throw new Error(`Please specify an image type for the image field '${formField.name}'`);
            }

            const image = formField.imageType === SUPPORTED_IMAGE_TYPES.Png
                ? await pdfDoc.embedPng(formField.image)
                : await pdfDoc.embedJpg(formField.image); 

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