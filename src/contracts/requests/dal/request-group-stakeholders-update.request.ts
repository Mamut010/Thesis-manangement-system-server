import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class RequestGroupStakeholdersUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString({ each: true })
    addedGroupIds?: string[];

    @Expose()
    @IsOptional()
    @IsString({ each: true })
    removedGroupIds?: string[];

    @Expose()
    @IsOptional()
    @IsString({ each: true })
    acceptedIds?: string[];
}