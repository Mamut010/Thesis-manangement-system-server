import { IsNumberFilter, IsStringFilter } from "../../decorators";
import { NumberFilter, StringFilter } from "../../lib/query";
import { BaseQueryRequest } from "../bases";

export class ThesesQueryRequest extends BaseQueryRequest {
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