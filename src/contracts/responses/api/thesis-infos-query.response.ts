import { Expose, Type } from "class-transformer";
import { ThesisInfoDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class ThesisInfosQueryResponse extends BaseQueryResponse implements QueryResponse<ThesisInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => ThesisInfoDto)
    content!: ThesisInfoDto[];
}