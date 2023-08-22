import { Expose, Type } from "class-transformer";
import { UserInfoDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class AuthUsersQueryResponse extends BaseQueryResponse implements QueryResponse<UserInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => UserInfoDto)
    content!: UserInfoDto[];
}