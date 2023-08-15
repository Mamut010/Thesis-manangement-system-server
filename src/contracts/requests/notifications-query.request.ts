import { BooleanFilter, DateFilter, NullableNumberFilter, NullableStringFilter } from "../../lib/query";
import { 
    IsBooleanFilterArray,
    IsDateFilterArray,
    IsNullableNumberFilterArray, 
    IsNullableStringFilterArray 
} from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class NotificationsQueryRequest extends BaseQueryRequest {
    @IsNullableNumberFilterArray()
    senderIdFilter?: NullableNumberFilter[];

    @IsNullableStringFilterArray()
    titleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    contentFilter?: NullableStringFilter[];

    @IsBooleanFilterArray()
    isReadFilter?: BooleanFilter[];

    @IsDateFilterArray()
    createdAtFilter?: DateFilter[];
}