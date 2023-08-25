import { Expose, Type } from "class-transformer";
import { LocationDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class LocationsQueryResponse extends BaseQueryResponse implements QueryResponse<LocationDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => LocationDto)
    content!: LocationDto[];
}