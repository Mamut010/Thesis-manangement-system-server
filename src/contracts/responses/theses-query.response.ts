import { Expose, Type } from "class-transformer";
import { ThesisInfoDto } from "../../shared/dtos";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";

export class ThesesQueryResponse {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => ThesisInfoDto)
    content!: ThesisInfoDto[];

    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}