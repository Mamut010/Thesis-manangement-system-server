import { Type } from "class-transformer";
import { LecturerInfoDto } from "../../shared/dtos";
import { BaseQueryResponse } from "./base-query.response";

export class LecturersQueryResponse extends BaseQueryResponse<LecturerInfoDto> {
    @Type(() => LecturerInfoDto)
    content!: LecturerInfoDto[];
}