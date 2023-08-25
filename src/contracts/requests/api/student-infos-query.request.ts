import { NullableNumberFilter, NullableStringFilter, NumberFilter, StringFilter } from "../../../lib/query";
import { 
    IsNullableNumberFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../../decorators";
import { BaseQueryRequest } from "../../bases";

export class StudentInfosQueryRequest extends BaseQueryRequest {
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

    @IsNullableNumberFilterArray()
    intakeFilter?: NullableNumberFilter[];

    @IsNumberFilterArray()
    ectsFilter?: NumberFilter[];
}