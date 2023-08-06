import { Expose, Type } from "class-transformer";
import { TopicDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class TopicsQueryResponse extends BaseQueryResponse implements QueryResponse<TopicDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => TopicDto)
    content!: TopicDto[];
}