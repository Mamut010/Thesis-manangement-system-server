import { Expose, Type } from "class-transformer";
import { UserOutputDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class AuthUsersQueryResponse extends BaseQueryResponse implements QueryResponse<UserOutputDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => UserOutputDto)
    content!: UserOutputDto[];
}