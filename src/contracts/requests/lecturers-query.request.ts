import { StringFilter } from "../../lib/query";
import { IsStringFilterArray } from "../../decorators";
import { BaseQueryRequest } from "../bases";

export class LecturersQueryRequest extends BaseQueryRequest {
    @IsStringFilterArray()
    lecturerIdFilter?: StringFilter[];

    @IsStringFilterArray()
    usernameFilter?: StringFilter[];

    @IsStringFilterArray()
    titleFilter?: StringFilter[];

    @IsStringFilterArray()
    emailFilter?: StringFilter[];
}