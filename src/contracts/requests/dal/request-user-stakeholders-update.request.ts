import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class RequestUserStakeholdersUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString({ each: true })
    addedUserIds?: string[];

    @Expose()
    @IsOptional()
    @IsString({ each: true })
    removedUserIds?: string[];

    @Expose()
    @IsOptional()
    @IsString({ each: true })
    acceptedIds?: string[];
}