import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentInfoDto {
    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    programId?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    programTitle?: string | null;
    
    @Expose()
    @IsOptional()
    @IsString()
    surname?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename?: string | null;

    @Expose()
    @IsDefined()
    @IsString()
    email!: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    intake?: number | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    ects!: number;
}