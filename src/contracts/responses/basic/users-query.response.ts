import { Expose, Type } from "class-transformer";
import { UserDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class UsersQueryResponse extends BaseQueryResponse implements QueryResponse<UserDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => UserDto)
    content!: UserDto[];
}