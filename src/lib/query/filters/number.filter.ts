import { IsDefined, IsIn, IsNumber, IsOptional } from "class-validator";
import { Expose, Type } from "class-transformer";
import { NumberFilterOperatorValues } from "../constants/filter-operators";
import { BinaryFilter } from "../interfaces/binary-filter";
import { NumberFilterOperator } from "../types/filter-operator";
import { DefaultQuerySettings } from "../constants/settings";

export class NumberFilter implements BinaryFilter<number, NumberFilterOperator> {
    @Expose()
    @IsDefined()
    @IsNumber()
    @Type(() => Number)
    value!: number;

    @Expose()
    @IsOptional()
    @IsIn(NumberFilterOperatorValues)
    operator: NumberFilterOperator = DefaultQuerySettings.NumberFilterOperator;
}