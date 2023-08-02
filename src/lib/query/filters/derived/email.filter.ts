import { IsEmail } from "class-validator";
import { StringFilter } from "./../basic/string.filter";

export class EmailFilter extends StringFilter {
    @IsEmail()
    value!: string;
}