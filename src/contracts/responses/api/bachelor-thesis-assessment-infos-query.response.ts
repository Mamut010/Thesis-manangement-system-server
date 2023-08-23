import { Expose, Type } from "class-transformer";
import { BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class BachelorThesisAssessmentInfosQueryResponse extends BaseQueryResponse 
    implements QueryResponse<BachelorThesisAssessmentInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisAssessmentInfoDto)
    content!: BachelorThesisAssessmentInfoDto[];
}