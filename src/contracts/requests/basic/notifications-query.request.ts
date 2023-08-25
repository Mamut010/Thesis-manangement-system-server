import { BooleanFilter, DateFilter, NullableStringFilter } from "../../../lib/query";
import { 
    IsBooleanFilterArray,
    IsDateFilterArray,
    IsNullableStringFilterArray 
} from "../../../decorators";
import { BaseQueryRequest } from "../../bases";

export class NotificationsQueryRequest extends BaseQueryRequest {
    @IsNullableStringFilterArray()
    senderIdFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    titleFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    contentFilter?: NullableStringFilter[];

    @IsBooleanFilterArray()
    isReadFilter?: BooleanFilter[];

    @IsDateFilterArray()
    createdAtFilter?: DateFilter[];
}