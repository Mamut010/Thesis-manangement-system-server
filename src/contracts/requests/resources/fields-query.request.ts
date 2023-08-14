import { IsNullableStringFilterArray, IsStringFilterArray } from "../../../decorators";
import { NullableStringFilter, StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class FieldsQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    titleFilter?: StringFilter[];

    @IsNullableStringFilterArray()
    descriptionFilter?: NullableStringFilter[];
}