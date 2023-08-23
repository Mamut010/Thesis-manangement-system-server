import { Expose, Type } from "class-transformer";
import { OralDefenseAssessmentInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class OralDefenseAssessmentInfosQueryResponse extends BaseQueryResponse 
    implements QueryResponse<OralDefenseAssessmentInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseAssessmentInfoDto)
    content!: OralDefenseAssessmentInfoDto[];
}