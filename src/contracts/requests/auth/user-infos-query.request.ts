import { 
    IsNullableDateFilterArray, 
    IsNullableStringFilterArray, 
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../../decorators";
import { NullableDateFilter, NullableStringFilter, NumberFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class UserInfosQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    userIdFilter?: StringFilter[];

    @IsNumberFilterArray()
    roleIdFilter?: NumberFilter[];

    @IsStringFilterArray()
    roleNameFilter?: StringFilter[];

    @IsStringFilterArray()
    usernameFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    emailFilter?: NullableStringFilter[];

    @IsNullableDateFilterArray()
    lastActivityDateFilter?: NullableDateFilter[];
}