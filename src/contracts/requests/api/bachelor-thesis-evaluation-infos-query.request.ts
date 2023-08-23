import { BaseQueryRequest } from "../../bases";
import { 
    IsNullableBooleanFilterArray, 
    IsNullableDateFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray
} from "../../../decorators";
import { NullableBooleanFilter, NullableDateFilter, NullableStringFilter, NumberFilter, StringFilter } from "../../../lib/query";

export class BachelorThesisEvaluationInfosQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    studentIdFilter?: StringFilter[];

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

    @IsNullableBooleanFilterArray()
    supervisorConfirmedFilter?: NullableBooleanFilter[];
}