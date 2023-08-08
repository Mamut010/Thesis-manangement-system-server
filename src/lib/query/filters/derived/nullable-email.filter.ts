import { IsEmail } from "class-validator";
import { NullableStringFilter } from "../basic/nullable-string.filter";

export class NullableEmailFilter extends NullableStringFilter {
    @IsEmail()
    value!: string;
}