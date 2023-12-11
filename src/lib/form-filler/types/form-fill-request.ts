import { FormField } from "../interfaces/form-field";

export type FormFillRequest = {
    [property: string]: FormField,
}