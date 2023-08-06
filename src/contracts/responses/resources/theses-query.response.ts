import { Expose, Type } from "class-transformer";
import { ThesisDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class ThesesQueryResponse extends BaseQueryResponse implements QueryResponse<ThesisDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => ThesisDto)
    content!: ThesisDto[];
}