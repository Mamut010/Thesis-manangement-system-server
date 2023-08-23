import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentInfoDto {
    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;
    
    @Expose()
    @IsOptional()
    @IsString()
    surname!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename!: string | null;

    @Expose()
    @IsOptional()
    @IsEmail()
    email!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    intake!: string | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    ects!: number;
}