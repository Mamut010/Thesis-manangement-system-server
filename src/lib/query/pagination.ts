import { Expose, Type } from "class-transformer";
import { DefaultQuerySettings } from "./constants/settings";
import { IsNumber, IsOptional } from "class-validator";

export class Pagination {
    @Expose()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    skip: number = DefaultQuerySettings.Skip;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    take: number = DefaultQuerySettings.Take;
}