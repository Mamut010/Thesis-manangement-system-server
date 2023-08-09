import { IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { NullableStringFilterOperatorValues } from "../../constants/filter-operators";
import { BinaryFilter } from "../../interfaces/binary-filter";
import { NullableStringFilterOperator } from "../../types/filter-operator";
import { DefaultQuerySettings } from "../../constants/settings";
import { ValidateIfNotNullableOperator } from "../../decorators/validate-if-not-nullable-operator.decorator";

export class NullableStringFilter implements BinaryFilter<string, NullableStringFilterOperator> {
    @Expose()
    @ValidateIfNotNullableOperator()
    @IsDefined()
    @IsString()
    value!: string;

    @Expose()
    @IsOptional()
    @IsIn(NullableStringFilterOperatorValues)
    operator: NullableStringFilterOperator = DefaultQuerySettings.NullableStringFilterOperator;
}