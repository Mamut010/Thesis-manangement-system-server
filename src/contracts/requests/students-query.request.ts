import { NullableStringFilter, NumberFilter, StringFilter } from "../../lib/query";
import { IsNullableStringFilter, IsNumberFilterArray, IsStringFilterArray } from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class StudentsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNullableStringFilter()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilter()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilter()
    emailFilter?: NullableStringFilter[];

    @IsNullableStringFilter()
    signatureFilter?: NullableStringFilter[];

    @IsNullableStringFilter()
    intakeFilter?: NullableStringFilter[];

    @IsNumberFilterArray()
    ectsFilter?: NumberFilter[];
}