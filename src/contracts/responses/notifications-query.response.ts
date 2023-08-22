import { Expose, Type } from "class-transformer";
import { NotificationDto } from "../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../interfaces";
import { BaseQueryResponse } from "../bases";

export class NotificationsQueryResponse extends BaseQueryResponse implements QueryResponse<NotificationDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => NotificationDto)
    content!: NotificationDto[];
}