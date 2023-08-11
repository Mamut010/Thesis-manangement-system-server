import { FormFillRequest } from "../types/form-fill-request";
import { PathOrTypedArray } from "../types/path-or-typed-array";
import { FormField } from "./form-field";

export interface FormFillerInterface {
    fill(doc: PathOrTypedArray, data: FormFillRequest | FormField[]): Promise<Buffer>;
    fillAsBase64(doc: PathOrTypedArray, data: FormFillRequest | FormField[]): Promise<string>;
}