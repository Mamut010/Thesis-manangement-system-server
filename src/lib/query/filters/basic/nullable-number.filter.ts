import { IsDefined, IsIn, IsNumber, IsOptional } from "class-validator";
import { Expose, Type } from "class-transformer";
import { NullableNumberFilterOperatorValues } from "../../constants/filter-operators";
import { BinaryFilter } from "../../interfaces/binary-filter";
import { NullableNumberFilterOperator } from "../../types/filter-operator";
import { DefaultQuerySettings } from "../../constants/settings";
import { ValidateIfNotNullableOperator } from "../../decorators/validate-if-not-nullable-operator.decorator";

export class NullableNumberFilter implements BinaryFilter<number, NullableNumberFilterOperator> {
    @Expose()
    @ValidateIfNotNullableOperator()
    @IsDefined()
    @IsNumber()
    @Type(() => Number)
    value!: number;

    @Expose()
    @IsOptional()
    @IsIn(NullableNumberFilterOperatorValues)
    operator: NullableNumberFilterOperator = DefaultQuerySettings.NullableNumberFilterOperator;
}