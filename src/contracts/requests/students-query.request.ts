import { Expose, Type } from "class-transformer";
import { EmailFilter, NumberFilter, OrderBy, Pagination, StringFilter } from "../../lib/query";
import { IsOptional, ValidateNested } from "class-validator";

export class StudentsQueryRequest {
    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => NumberFilter)
    studentIdFilter?: NumberFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilter)
    usernameFilter?: StringFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilter)
    surnameFilter?: StringFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilter)
    forenameFilter?: StringFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => EmailFilter)
    emailFilter?: EmailFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilter)
    signatureFilter?: StringFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilter)
    intakeFilter?: StringFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => NumberFilter)
    ectsFilter?: NumberFilter;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => Pagination)
    pagination: Pagination = new Pagination();

    @Expose()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrderBy)
    orderBy?: OrderBy[];
}