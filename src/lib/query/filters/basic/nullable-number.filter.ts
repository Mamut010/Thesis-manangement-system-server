import { IsDefined, IsIn, IsNumber, IsOptional, ValidateIf } from "class-validator";
import { Expose, Type } from "class-transformer";
import { NullableNumberFilterOperatorValues } from "../../constants/filter-operators";
import { BinaryFilter } from "../../interfaces/binary-filter";
import { NullableNumberFilterOperator } from "../../types/filter-operator";
import { DefaultQuerySettings } from "../../constants/settings";
import { ValidateIfNotNullableOperator } from "../../utils/validator-helpers";

export class NullableNumberFilter implements BinaryFilter<number, NullableNumberFilterOperator> {
    @Expose()
    @ValidateIf(ValidateIfNotNullableOperator<NullableNumberFilter>)
    @IsDefined()
    @IsNumber()
    @Type(() => Number)
    value!: number;

    @Expose()
    @IsOptional()
    @IsIn(NullableNumberFilterOperatorValues)
    operator: NullableNumberFilterOperator = DefaultQuerySettings.NullableNumberFilterOperator;
}