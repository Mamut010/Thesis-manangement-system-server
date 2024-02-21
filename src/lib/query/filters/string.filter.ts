import { IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { StringFilterOperatorValues } from "../constants/filter-operators";
import { BinaryFilter } from "../interfaces/binary-filter";
import { StringFilterOperator } from "../types/filter-operator";
import { DefaultQuerySettings } from "../constants/settings";

export class StringFilter implements BinaryFilter<string, StringFilterOperator> {
    @Expose()
    @IsDefined()
    @IsString()
    value!: string;

    @Expose()
    @IsOptional()
    @IsIn(StringFilterOperatorValues)
    operator: StringFilterOperator = DefaultQuerySettings.StringFilterOperator;
}