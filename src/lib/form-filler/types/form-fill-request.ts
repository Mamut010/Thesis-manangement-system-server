import { FormField } from "../interfaces/form-field";

export interface FormFillRequest {
    [property: string]: FormField,
}