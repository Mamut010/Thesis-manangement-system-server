import { Expose, Type } from "class-transformer";
import { OralDefenseAssessmentDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class OralDefenseAssessmentsQueryResponse extends BaseQueryResponse 
    implements QueryResponse<OralDefenseAssessmentDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseAssessmentDto)
    content!: OralDefenseAssessmentDto[];
}