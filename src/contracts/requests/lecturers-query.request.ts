import { NumberFilter, StringFilter } from "../../lib/query";
import { IsNumberFilter, IsStringFilter } from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class LecturersQueryRequest extends BaseQueryRequest {
    @IsNumberFilter()
    lecturerIdFilter?: NumberFilter;

    @IsStringFilter()
    usernameFilter?: StringFilter;

    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsStringFilter()
    emailFilter?: StringFilter;
}