import { IsStringFilter } from "../../../decorators";
import { StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class RolesQueryRequest extends BaseQueryRequest {
    @IsStringFilter()
    nameFilter?: StringFilter;

    @IsStringFilter()
    descriptionFilter?: StringFilter;
}