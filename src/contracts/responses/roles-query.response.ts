import { Expose, Type } from "class-transformer";
import { RoleDto } from "../../shared/dtos";
import { QueryResponse } from "../interfaces";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";

export class RolesQueryResponse implements QueryResponse<RoleDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    content!: RoleDto[];

    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}