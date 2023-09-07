import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class WorkflowStaticType {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    name!: string;
}