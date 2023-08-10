import { PDFDocument } from "pdf-lib";
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

    async fillToBase64(doc: PathOrTypedArray, data: FormFillRequest | FormField[]): Promise<string> {
        const pdfDoc = await this.fillDoc(doc, data);
        return await pdfDoc.saveAsBase64()
    }

    private async fillDoc(doc: PathOrTypedArray, data: FormFillRequest | FormField[])
        : Promise<PDFDocument> {
        if (typeof doc === 'string') {
            doc = await this.loadPdfFromString(doc);
        }

        const pdfDoc = await PDFDocument.load(doc);
        const form = pdfDoc.getForm();
        const pdfFormFiller = new PdfFormFieldHandler(form);

        Object.values(data).forEach(formField => formField.accept(pdfFormFiller));
        return pdfDoc;
    }

    private loadPdfFromString(path: string) {
        return fs.readFile(path);
    }
}