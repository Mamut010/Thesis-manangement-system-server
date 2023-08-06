import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class Location {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}