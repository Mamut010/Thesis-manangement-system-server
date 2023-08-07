import { Expose, Type } from "class-transformer";
import { OralDefenseRegistrationDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class OralDefenseRegistrationsQueryResponse extends BaseQueryResponse 
    implements QueryResponse<OralDefenseRegistrationDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseRegistrationDto)
    content!: OralDefenseRegistrationDto[];
}