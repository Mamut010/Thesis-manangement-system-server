import { IsDefined, IsIn, IsOptional, IsEmail } from "class-validator";
import { Expose, Type } from "class-transformer";
import { DefaultQuerySettings } from "../constants/settings";
import { ListFilter } from "../interfaces/list-filter";
import { ListFilterOperator } from "../types/list-filter-operator";
import { ListFilterOperatorValues } from "../constants/list-filter-operators";

export class EmailListFilter implements ListFilter<string> {
    @Expose()
    @IsDefined()
    @IsEmail(undefined, { each: true })
    @Type(() => String)
    value!: string[];

    @Expose()
    @IsOptional()
    @IsIn(ListFilterOperatorValues)
    operator: ListFilterOperator = DefaultQuerySettings.ListFilterOperator;
}