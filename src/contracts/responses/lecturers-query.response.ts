import { Expose, Type } from "class-transformer";
import { LecturerInfoDto } from "../../shared/dtos";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";
import { QueryResponse } from "../interfaces";

export class LecturersQueryResponse implements QueryResponse<LecturerInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => LecturerInfoDto)
    content!: LecturerInfoDto[];

    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}