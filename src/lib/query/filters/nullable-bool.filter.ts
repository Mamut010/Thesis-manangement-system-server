import { IsBoolean, IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { NullableBoolFilterOperatorValues } from "../constants/filter-operators";
import { BinaryFilter } from "../interfaces/binary-filter";
import { NullableBoolFilterOperator } from "../types/filter-operator";
import { DefaultQuerySettings } from "../constants/settings";
import { ValidateIfNotNullableOperator } from "../decorators/validate-if-not-nullable-operator.decorator";

export class NullableBooleanFilter implements BinaryFilter<boolean, NullableBoolFilterOperator> {
    @Expose()
    @ValidateIfNotNullableOperator()
    @IsDefined()
    @IsBoolean()
    @Type(() => Boolean)
    value!: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(NullableBoolFilterOperatorValues)
    operator: NullableBoolFilterOperator = DefaultQuerySettings.NullableBoolFilterOperator;
}