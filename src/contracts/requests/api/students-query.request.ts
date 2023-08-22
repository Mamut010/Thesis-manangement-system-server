import { NumberFilter, StringFilter } from "../../../lib/query";
import { IsNumberFilterArray, IsStringFilterArray } from "../../../decorators";
import { BaseQueryRequest } from "../../bases";

export class StudentsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsStringFilterArray()
    usernameFilter?: StringFilter[];

    @IsStringFilterArray()
    surnameFilter?: StringFilter[];

    @IsStringFilterArray()
    forenameFilter?: StringFilter[];

    @IsStringFilterArray()
    emailFilter?: StringFilter[];

    @IsStringFilterArray()
    signatureFilter?: StringFilter[];

    @IsStringFilterArray()
    intakeFilter?: StringFilter[];

    @IsNumberFilterArray()
    ectsFilter?: NumberFilter[];
}