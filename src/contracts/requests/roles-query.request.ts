import { IsStringFilter } from "../../decorators";
import { StringFilter } from "../../lib/query";
import { QueryRequest } from "../bases";

export class RolesQueryRequest extends QueryRequest {
    @IsStringFilter()
    nameFilter?: StringFilter;

    @IsStringFilter()
    descriptionFilter?: StringFilter;
}