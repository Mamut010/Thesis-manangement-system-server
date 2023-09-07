import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class ThesisRequestCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    title!: string
}