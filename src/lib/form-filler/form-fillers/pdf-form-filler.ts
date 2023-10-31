import { PDFDocument, PDFForm } from "pdf-lib";
import { FormFillerInterface } from "../interfaces/form-filler.interface";
import { FormFillRequest } from "../types/form-fill-request";
import * as fs from "fs/promises";
import { PdfFormFieldHandler } from "../form-field-handlers/pdf-form-field-handler";
import { FormField } from "../interfaces/form-field";
import { injectable } from "inversify";
import { PathOrTypedArray } from "../types/path-or-typed-array";

@injectable()
export class PdfFormFiller implements FormFillerInterface {
    async fill(doc: PathOrTypedArray, data: FormFillRequest | FormField[]): Promise<Buffer> {
        const pdfDoc = await this.fillDoc(doc, data);
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }

    async fillAsBase64(doc: PathOrTypedArray, data: FormFillRequest | FormField[]): Promise<string> {
        const pdfDoc = await this.fillDoc(doc, data);
        return await pdfDoc.saveAsBase64()
    }

    private async fillDoc(doc: PathOrTypedArray, data: FormFillRequest | FormField[])
        : Promise<PDFDocument> {
        const pdfDoc = await this.loadPdfDoc(doc);
        const form = pdfDoc.getForm();
        const formFields = this.makeFormFields(data);

        await this.fillPdfForm(form, formFields);

        form.flatten();
        return pdfDoc;
    }

    private async loadPdfDoc(doc: PathOrTypedArray) {
        if (typeof doc === 'string') {
            doc = await this.loadPdfFromString(doc);
        }
        return await PDFDocument.load(doc);
    }

    private loadPdfFromString(path: string) {
        return fs.readFile(path);
    }

    private makeFormFields(data: FormFillRequest | FormField[]) {
        return Object.values(data);
    }

    private async fillPdfForm(form: PDFForm, formFields: FormField[]) {
        const pdfFormHandler = new PdfFormFieldHandler(form);
        for(const formField of formFields) {
            await formField.accept(pdfFormHandler);
        }
    }
}