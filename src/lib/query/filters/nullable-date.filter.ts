import { IsDate, IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { NullableDateFilterOperatorValues } from "../constants/filter-operators";
import { BinaryFilter } from "../interfaces/binary-filter";
import { NullableDateFilterOperator } from "../types/filter-operator";
import { DefaultQuerySettings } from "../constants/settings";
import { ValidateIfNotNullableOperator } from "../decorators/validate-if-not-nullable-operator.decorator";

export class NullableDateFilter implements BinaryFilter<Date, NullableDateFilterOperator> {
    @Expose()
    @ValidateIfNotNullableOperator()
    @IsDefined()
    @IsDate()
    @Type(() => Date)
    value!: Date;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(NullableDateFilterOperatorValues)
    operator: NullableDateFilterOperator = DefaultQuerySettings.NullableDateFilterOperator;
}