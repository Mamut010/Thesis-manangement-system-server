import { Expose, Type } from "class-transformer";
import { RequestDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class RequestsQueryResponse extends BaseQueryResponse implements QueryResponse<RequestDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => RequestDto)
    content!: RequestDto[];
}