import { Expose, Type } from "class-transformer";
import { ArrayMinSize, IsDefined, IsNumber, IsString, ValidateNested} from "class-validator"
import { JwtRefreshContextDto } from "./jwt-refresh-context.dto";

export class JwtRefreshPayloadDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => JwtRefreshContextDto)
    context!: JwtRefreshContextDto;

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