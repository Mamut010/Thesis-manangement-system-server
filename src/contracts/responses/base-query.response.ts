import { Expose } from "class-transformer";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";

export abstract class BaseQueryResponse<TDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    content!: TDto[];

    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}