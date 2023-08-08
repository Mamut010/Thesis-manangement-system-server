import { IsDate, IsDefined, IsIn, IsOptional, IsString, ValidateIf } from "class-validator";
import { Expose, Type } from "class-transformer";
import { NullableDateFilterOperatorValues } from "../../constants/filter-operators";
import { BinaryFilter } from "../../interfaces/binary-filter";
import { NullableDateFilterOperator } from "../../types/filter-operator";
import { DefaultQuerySettings } from "../../constants/settings";
import { ValidateIfNotNullableOperator } from "../../utils/validator-helpers";
import { NullableBooleanFilter } from "./nullable-bool.filter";

export class NullableDateFilter implements BinaryFilter<Date, NullableDateFilterOperator> {
    @Expose()
    @ValidateIf(ValidateIfNotNullableOperator<NullableBooleanFilter>)
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