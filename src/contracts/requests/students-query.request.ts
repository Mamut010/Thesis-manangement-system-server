import { NullableNumberFilter, NullableStringFilter, NumberFilter, StringFilter } from "../../lib/query";
import { 
    IsNullableNumberFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class StudentsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    programTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    emailFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    signatureFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    intakeFilter?: NullableNumberFilter[];

    @IsNumberFilterArray()
    ectsFilter?: NumberFilter[];
}