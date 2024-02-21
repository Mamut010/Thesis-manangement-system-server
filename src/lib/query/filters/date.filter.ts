import { IsDate, IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { DateFilterOperatorValues } from "../constants/filter-operators";
import { BinaryFilter } from "../interfaces/binary-filter";
import { DateFilterOperator } from "../types/filter-operator";
import { DefaultQuerySettings } from "../constants/settings";

export class DateFilter implements BinaryFilter<Date, DateFilterOperator> {
    @Expose()
    @IsDefined()
    @IsDate()
    @Type(() => Date)
    value!: Date;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(DateFilterOperatorValues)
    operator: DateFilterOperator = DefaultQuerySettings.DateFilterOperator;
}