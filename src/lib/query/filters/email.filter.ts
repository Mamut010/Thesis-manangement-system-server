import { IsEmail } from "class-validator";
import { StringFilter } from "./string.filter";

export class EmailFilter extends StringFilter {
    @IsEmail()
    value!: string;
}