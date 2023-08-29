import { 
    IsNullableDateFilterArray,
    IsNumberFilterArray, 
    IsStringFilterArray 
} from "../../../decorators";
import { NullableDateFilter, NumberFilter, StringFilter } from "../../../lib/query";
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

    @IsNullableDateFilterArray()
    lastActivityDateFilter?: NullableDateFilter[];
}