import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class StringArrayResponse {
    @Expose()
    @IsDefined()
    @IsString({ each: true })
    content!: string[];

    constructor(content: string[]) {
        this.content = content;
    }
}