import { Expose, Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";
import { makeArray } from "../../utils/array-helpers";

export class NotificationMarkAsReadRequest {
    @Expose()
    @IsDefined()
    @IsNumber(undefined, { each: true })
    @Transform(({ value }) => makeArray<unknown>(value))
    ids!: number[]
}