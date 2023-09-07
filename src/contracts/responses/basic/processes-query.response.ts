import { Expose, Type } from "class-transformer";
import { ProcessDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class ProcessesQueryResponse extends BaseQueryResponse implements QueryResponse<ProcessDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => ProcessDto)
    content!: ProcessDto[];
}