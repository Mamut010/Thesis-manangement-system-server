import { BaseQueryRequest } from "../../bases";
import {
    IsNullableDateFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray
} from "../../../decorators";
import {NullableDateFilter, NullableStringFilter, NumberFilter, StringFilter } from "../../../lib/query";

export class BachelorThesisEvaluationInfosQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

    @IsNumberFilterArray()
    attemptNoFilter?: NumberFilter[];

    @IsNumberFilterArray()
    thesisIdFilter?: NumberFilter[];

    @IsStringFilterArray()
    supervisorIdFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()    
    thesisTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()    
    supervisorTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    titleFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    dateFilter?: NullableDateFilter[];
}