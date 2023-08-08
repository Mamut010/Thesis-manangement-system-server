import { IsNullableStringFilter, IsStringFilter } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class RolesQueryRequest extends BaseQueryRequest {
    @IsStringFilter()
    nameFilter?: StringFilter;

    @IsNullableStringFilter()
    descriptionFilter?: NullableStringFilter;
}