import { IsBoolean, IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { BoolFilterOperatorValues } from "../constants/filter-operators";
import { BinaryFilter } from "../interfaces/binary-filter";
import { BoolFilterOperator } from "../types/filter-operator";
import { DefaultQuerySettings } from "../constants/settings";

export class BooleanFilter implements BinaryFilter<boolean, BoolFilterOperator> {
    @Expose()
    @IsDefined()
    @IsBoolean()
    @Type(() => Boolean)
    value!: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(BoolFilterOperatorValues)
    operator: BoolFilterOperator = DefaultQuerySettings.BoolFilterOperator;
}