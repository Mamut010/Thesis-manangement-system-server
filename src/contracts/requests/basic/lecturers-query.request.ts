import { NullableStringFilter, NumberFilter, StringFilter } from "../../../lib/query";
import { IsNullableStringFilterArray, IsNumberFilterArray, IsStringFilterArray } from "../../../decorators";
import { BaseQueryRequest } from "../../bases";

export class LecturersQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    lecturerIdFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    titleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    bioFilter?: NullableStringFilter[];

    @IsStringFilterArray()
    typeFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    emailFilter?: NullableStringFilter[];

    @IsNumberFilterArray()
    numberOfThesesFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    signatureFilter?: NullableStringFilter[];
}