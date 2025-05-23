import { Expose, Type } from "class-transformer";
import { LecturerInfoDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class LecturerInfosQueryResponse extends BaseQueryResponse implements QueryResponse<LecturerInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => LecturerInfoDto)
    content!: LecturerInfoDto[];
}