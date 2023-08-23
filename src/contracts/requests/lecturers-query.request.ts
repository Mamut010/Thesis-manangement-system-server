import { NullableStringFilter, NumberFilter, StringFilter } from "../../lib/query";
import { IsNullableStringFilter, IsNumberFilter, IsStringFilterArray } from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class LecturersQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    lecturerIdFilter?: StringFilter[];

    @IsNullableStringFilter()
    titleFilter?: NullableStringFilter[];

    @IsNullableStringFilter()
    bioFilter?: NullableStringFilter[];

    @IsStringFilterArray()
    typeFilter?: StringFilter[];

    @IsNullableStringFilter()
    emailFilter?: NullableStringFilter[];

    @IsNumberFilter()
    numberOfThesesFilter?: NumberFilter[];

    @IsNullableStringFilter()
    signatureFilter?: NullableStringFilter[];
}