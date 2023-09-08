import { Expose, Type } from "class-transformer";
import { RequestInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class RequestInfosQueryResponse extends BaseQueryResponse implements QueryResponse<RequestInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => RequestInfoDto)
    content!: RequestInfoDto[];
}