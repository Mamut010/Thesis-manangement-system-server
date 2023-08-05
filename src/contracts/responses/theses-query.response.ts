import { Type } from "class-transformer";
import { ThesisInfoDto } from "../../shared/dtos";
import { BaseQueryResponse } from "./base-query.response";

export class ThesesQueryResponse extends BaseQueryResponse<ThesisInfoDto> {
    @Type(() => ThesisInfoDto)
    content!: ThesisInfoDto[];
}