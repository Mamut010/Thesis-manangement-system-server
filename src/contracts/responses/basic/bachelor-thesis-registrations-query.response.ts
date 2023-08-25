import { Expose, Type } from "class-transformer";
import { BachelorThesisRegistrationDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class BachelorThesisRegistrationsQueryResponse extends BaseQueryResponse 
    implements QueryResponse<BachelorThesisRegistrationDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisRegistrationDto)
    content!: BachelorThesisRegistrationDto[];
}