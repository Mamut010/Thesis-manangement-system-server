import { Expose, Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class NotificationMarkAsReadRequest {
    @Expose()
    @IsDefined()
    @IsNumber(undefined, { each: true })
    @Transform(({ value }) => !Array.isArray(value) ? [value] : value)
    ids!: number[]
}