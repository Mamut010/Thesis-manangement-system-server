import { IsNullableStringFilterArray, IsStringFilterArray } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class RolesQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    nameFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    descriptionFilter?: NullableStringFilter[];
}