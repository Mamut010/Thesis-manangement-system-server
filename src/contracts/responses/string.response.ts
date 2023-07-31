import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class StringResponse {
    @Expose()
    @IsDefined()
    @IsString()
    content!: string;

    constructor(content: string) {
        this.content = content;
    }
}