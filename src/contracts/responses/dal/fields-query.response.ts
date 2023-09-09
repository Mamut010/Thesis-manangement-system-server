import { Expose, Type } from "class-transformer";
import { FieldDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class FieldsQueryResponse extends BaseQueryResponse implements QueryResponse<FieldDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => FieldDto)
    content!: FieldDto[];
}