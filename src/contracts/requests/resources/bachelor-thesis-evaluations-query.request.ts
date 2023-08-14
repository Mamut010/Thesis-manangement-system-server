import { BaseQueryRequest } from "../../bases";
import { 
    IsNullableBooleanFilterArray, 
    IsNullableDateFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray 
} from "../../../decorators";
import { NullableBooleanFilter, NullableDateFilter, NullableStringFilter, NumberFilter } from "../../../lib/query";

export class BachelorThesisEvaluationsQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    studentIdFilter?: NumberFilter[];

    @IsNumberFilterArray()
    thesisIdFilter?: NumberFilter[];

    @IsNumberFilterArray()
    supervisorIdFilter?: NumberFilter[];

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