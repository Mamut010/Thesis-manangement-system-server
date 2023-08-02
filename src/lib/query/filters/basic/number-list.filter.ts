import { IsDefined, IsIn, IsNumber, IsOptional } from "class-validator";
import { Expose, Type } from "class-transformer";
import { DefaultQuerySettings } from "../../constants/settings";
import { ListFilter } from "../../interfaces/list-filter";
import { ListFilterOperator } from "../../types/list-filter-operator";
import { ListFilterOperatorValues } from "../../constants/list-filter-operators";

export class NumberListFilter implements ListFilter<number> {
    @Expose()
    @IsDefined()
    @IsNumber(undefined, { each: true })
    @Type(() => Number)
    value!: number[];

    @Expose()
    @IsOptional()
    @IsIn(ListFilterOperatorValues)
    operator: ListFilterOperator = DefaultQuerySettings.ListFilterOperator;
}