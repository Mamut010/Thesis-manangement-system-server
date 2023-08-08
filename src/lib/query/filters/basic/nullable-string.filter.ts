import { IsDefined, IsIn, IsOptional, IsString, ValidateIf } from "class-validator";
import { Expose } from "class-transformer";
import { NullableStringFilterOperatorValues } from "../../constants/filter-operators";
import { BinaryFilter } from "../../interfaces/binary-filter";
import { NullableStringFilterOperator } from "../../types/filter-operator";
import { DefaultQuerySettings } from "../../constants/settings";
import { ValidateIfNotNullableOperator } from "../../utils/validator-helpers";

export class NullableStringFilter implements BinaryFilter<string, NullableStringFilterOperator> {
    @Expose()
    @ValidateIf(ValidateIfNotNullableOperator<NullableStringFilter>)
    @IsDefined()
    @IsString()
    value!: string;

    @Expose()
    @IsOptional()
    @IsIn(NullableStringFilterOperatorValues)
    operator: NullableStringFilterOperator = DefaultQuerySettings.NullableStringFilterOperator;
}