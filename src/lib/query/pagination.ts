import { Expose, Type } from "class-transformer";
import { DefaultQuerySettings } from "./constants/settings";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class Pagination {
    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    skip: number = DefaultQuerySettings.Skip;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(DefaultQuerySettings.MinTake)
    @Max(DefaultQuerySettings.MaxTake)
    @Type(() => Number)
    take: number = DefaultQuerySettings.Take;
}