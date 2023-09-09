import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class GroupMembersSetRequest {
    @Expose()
    @IsDefined()
    @IsString({ each: true })
    userIds!: string[]
}