import { IsStringFilter } from "../../../decorators";
import { StringFilter } from "../../../lib/query";
import { BaseQueryRequest } from "../../bases";

export class LocationsQueryRequest extends BaseQueryRequest {
    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsStringFilter()
    descriptionFilter?: StringFilter;
}