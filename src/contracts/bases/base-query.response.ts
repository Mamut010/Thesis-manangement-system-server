import { Expose } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class BaseQueryResponse {
    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}