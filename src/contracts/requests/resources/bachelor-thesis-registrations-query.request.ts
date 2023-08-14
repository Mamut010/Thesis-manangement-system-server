import { 
    IsNumberFilterArray,
    IsNullableStringFilterArray, 
    IsNullableDateFilterArray,
    IsNullableBooleanFilterArray
} from "../../../decorators";
import { 
    NumberFilter,
    NullableStringFilter, 
    NullableDateFilter,
    NullableBooleanFilter
} from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class BachelorThesisRegistrationsQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    studentIdFilter?: NumberFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    dateOfBirthFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    placeOfBirthFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    thesisTitleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    furtherParticipantsFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    studentDateFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    supervisor1TitleFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    supervisor1DateFilter?: NullableDateFilter[];

    @IsNullableBooleanFilterArray()
    supervisor1ConfirmedFilter?: NullableBooleanFilter[];

    @IsNullableStringFilterArray()
    supervisor2TitleFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    supervisor2DateFilter?: NullableDateFilter[];

    @IsNullableBooleanFilterArray()
    supervisor2ConfirmedFilter?: NullableBooleanFilter[];

    @IsNullableBooleanFilterArray()
    adminConfirmedFilter?: NullableBooleanFilter[];

    @IsNullableDateFilterArray()
    issuedFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    deadlineCopyFilter?: NullableDateFilter[];

    @IsNullableDateFilterArray()
    extensionGrantedFilter?: NullableDateFilter[];

    @IsNullableStringFilterArray()
    chairmanOfExaminationFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    dateOfIssueFilter?: NullableDateFilter[];
}