import { IsEmail } from "class-validator";
import { StringListFilter } from "./string-list.filter";

export class EmailListFilter extends StringListFilter {
    @IsEmail(undefined, { each: true })
    value!: string[];
}