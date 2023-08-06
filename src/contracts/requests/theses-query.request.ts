import { IsNumberFilter, IsStringFilter } from "../../decorators";
import { NumberFilter, StringFilter } from "../../lib/query";
import { QueryRequest } from "../bases";

export class ThesesQueryRequest extends QueryRequest {
    @IsNumberFilter()
    thesisIdFilter?: NumberFilter;

    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsStringFilter()
    topicFilter?: StringFilter;

    @IsStringFilter()
    fieldFilter?: StringFilter;

    @IsNumberFilter()
    slotFilter?: NumberFilter;

    @IsNumberFilter()
    slotLimitFilter?: NumberFilter;
}