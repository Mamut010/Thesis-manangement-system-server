import { 
    IsNumberFilterArray, 
    IsNullableStringFilterArray,
    IsNullableNumberFilterArray,
    IsNullableDateFilterArray
} from "../../../decorators";
import { 
    NumberFilter, 
    NullableStringFilter,
    NullableNumberFilter,
    NullableDateFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisAssessmentsQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    studentIdFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    thesisTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    furtherParticipantsFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    supervisor1TitleFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    supervisor1GradeFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    supervisor2TitleFilter?: NullableStringFilter[];

    @IsNullableNumberFilterArray()
    supervisor2GradeFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    assessmentDescriptionFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    assessmentDateFilter?: NullableDateFilter[];
}