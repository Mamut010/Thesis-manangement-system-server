import { NullableStringFilter, NumberFilter, StringFilter } from "../../../lib/query";
import { IsNullableStringFilterArray, IsNumberFilterArray, IsStringFilterArray } from "../../../decorators";
import { BaseQueryRequest } from "../../bases";

export class StudentInfosQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    emailFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    intakeFilter?: NullableStringFilter[];

    @IsNumberFilterArray()
    ectsFilter?: NumberFilter[];
}