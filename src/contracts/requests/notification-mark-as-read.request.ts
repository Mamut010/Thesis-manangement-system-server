import { Expose, Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class NotificationMarkAsReadRequest {
    @Expose()
    @IsDefined()
    @IsNumber(undefined, { each: true })
    @Transform((params) => { 
        const value: unknown = params.value; 
        return !Array.isArray(value) ? [value] : value as unknown[]; 
    })
    ids!: number[]
}