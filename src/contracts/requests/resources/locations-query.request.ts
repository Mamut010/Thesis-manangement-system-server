import { IsNullableStringFilter, IsStringFilter } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class LocationsQueryRequest extends BaseQueryRequest {
    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsNullableStringFilter()
    descriptionFilter?: NullableStringFilter;
}