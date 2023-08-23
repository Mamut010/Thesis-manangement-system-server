import { Expose, Type } from "class-transformer";
import { BachelorThesisRegistrationInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class BachelorThesisRegistrationInfosQueryResponse extends BaseQueryResponse 
    implements QueryResponse<BachelorThesisRegistrationInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisRegistrationInfoDto)
    content!: BachelorThesisRegistrationInfoDto[];
}