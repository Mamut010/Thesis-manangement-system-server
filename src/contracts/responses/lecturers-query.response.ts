import { Expose, Type } from "class-transformer";
import { LecturerInfoDto } from "../../shared/dtos";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";

export class LecturersQueryResponse {
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