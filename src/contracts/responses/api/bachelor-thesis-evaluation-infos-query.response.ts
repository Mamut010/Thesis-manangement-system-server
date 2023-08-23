import { Expose, Type } from "class-transformer";
import { BachelorThesisEvaluationInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class BachelorThesisEvaluationInfosQueryResponse extends BaseQueryResponse 
    implements QueryResponse<BachelorThesisEvaluationInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisEvaluationInfoDto)
    content!: BachelorThesisEvaluationInfoDto[];
}