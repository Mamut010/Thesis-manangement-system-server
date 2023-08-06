import { NumberFilter, StringFilter } from "../../lib/query";
import { IsNumberFilter, IsStringFilter } from "../../decorators";
import { QueryRequest } from "../bases";

export class LecturersQueryRequest extends QueryRequest {
    @IsNumberFilter()
    lecturerIdFilter?: NumberFilter;

    @IsStringFilter()
    usernameFilter?: StringFilter;

    @IsStringFilter()
    titleFilter?: StringFilter;

    @IsStringFilter()
    emailFilter?: StringFilter;
}