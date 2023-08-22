import { ArrayMinSize, IsDefined, IsNumber, IsString, ValidateNested } from "class-validator"
import { JwtAccessContextDto } from "./jwt-context.dto"
import { Expose, Type } from "class-transformer"

export class JwtAccessPayloadDto {
    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => JwtAccessContextDto)
    context!: JwtAccessContextDto;

    /**
     * JWT Specific fields
     */
    @Expose()
    @IsDefined()
    @IsNumber()
    iat!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    exp!: number;

    @Expose()
    @IsDefined()
    @IsString()
    iss!: string;

    @Expose()
    @IsDefined()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @Type(() => String)
    aud!: string[];
}