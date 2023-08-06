import { Expose, Type } from "class-transformer";
import { ThesisDto } from "../../shared/dtos";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";
import { QueryResponse } from "../interfaces";

export class ThesesQueryResponse implements QueryResponse<ThesisDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => ThesisDto)
    content!: ThesisDto[];

    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}