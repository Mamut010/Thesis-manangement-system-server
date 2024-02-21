import { IsDate, IsDefined, IsIn, IsOptional } from "class-validator";
import { Expose, Type } from "class-transformer";
import { DefaultQuerySettings } from "../constants/settings";
import { ListFilter } from "../interfaces/list-filter";
import { ListFilterOperator } from "../types/list-filter-operator";
import { ListFilterOperatorValues } from "../constants/list-filter-operators";

export class DateListFilter implements ListFilter<Date> {
    @Expose()
    @IsDefined()
    @IsDate({ each: true })
    @Type(() => Date)
    value!: Date[];

    @Expose()
    @IsOptional()
    @IsIn(ListFilterOperatorValues)
    operator: ListFilterOperator = DefaultQuerySettings.ListFilterOperator;
}