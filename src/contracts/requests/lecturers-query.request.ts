import { NumberFilter, StringFilter } from "../../lib/query";
import { IsNumberFilterArray, IsStringFilterArray } from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class LecturersQueryRequest extends BaseQueryRequest {
    @IsNumberFilterArray()
    lecturerIdFilter?: NumberFilter[];

    @IsStringFilterArray()
    usernameFilter?: StringFilter[];

    @IsStringFilterArray()
    titleFilter?: StringFilter[];

    @IsStringFilterArray()
    emailFilter?: StringFilter[];
}