import { Expose, Type } from "class-transformer"
import { IsDate, IsDefined, IsOptional, IsString, ValidateNested } from "class-validator"

export class RefreshTokenUpsertCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    token!: string;

    @Expose()
    @IsDefined()
    @IsDate()
    exp!: Date;
}

export class RefreshTokenUpsertUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    token?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    exp?: Date;
}

export class RefreshTokenUpsertRequest {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => RefreshTokenUpsertCreateRequest)
    create!: RefreshTokenUpsertCreateRequest;

    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => RefreshTokenUpsertUpdateRequest)
    update!: RefreshTokenUpsertUpdateRequest;
}