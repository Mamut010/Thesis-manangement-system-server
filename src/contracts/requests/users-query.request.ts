import { IsNullableStringFilterArray, IsNumberFilterArray, IsStringFilterArray } from "../../decorators";
import { NullableStringFilter, NumberFilter, StringFilter } from "../../lib/query";
import { BaseQueryRequest } from "../bases";

export class UsersQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    userIdFilter?: StringFilter[];

    @IsNumberFilterArray()
    roleIdFilter?: NumberFilter[];

    @IsStringFilterArray()
    usernameFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    emailFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    surnameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    forenameFilter?: NullableStringFilter[];

    @IsNullableStringFilterArray()
    signatureFilter?: NullableStringFilter[];
}