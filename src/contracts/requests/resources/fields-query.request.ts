import { IsNullableStringFilter, IsStringFilter } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class FieldsQueryRequest extends BaseQueryRequest {
    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsNullableStringFilter()
    descriptionFilter?: NullableStringFilter;
}