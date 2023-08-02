import { Expose, Type } from "class-transformer";
import { StudentInfoDto } from "../../shared/dtos";
import { IsDefined, IsNumber, ValidateNested } from "class-validator";

export class StudentsQueryResponse {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => StudentInfoDto)
    content!: StudentInfoDto[];

    @Expose()
    @IsDefined()
    @IsNumber()
    count!: number;
}