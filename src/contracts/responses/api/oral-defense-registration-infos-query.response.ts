import { Expose, Type } from "class-transformer";
import { OralDefenseRegistrationInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class OralDefenseRegistrationInfosQueryResponse extends BaseQueryResponse 
    implements QueryResponse<OralDefenseRegistrationInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseRegistrationInfoDto)
    content!: OralDefenseRegistrationInfoDto[];
}