import { Expose, Type } from "class-transformer";
import { BachelorThesisAssessmentDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class BachelorThesisAssessmentsQueryResponse extends BaseQueryResponse 
    implements QueryResponse<BachelorThesisAssessmentDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisAssessmentDto)
    content!: BachelorThesisAssessmentDto[];
}