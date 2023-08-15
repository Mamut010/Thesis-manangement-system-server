import { inject, injectable } from "inversify";
import { Authorized, CurrentUser, Get, HttpCode, JsonController, QueryParams } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { NotificationServiceInterface } from "../../shared/interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { NotificationsQueryResponse } from "../../contracts/responses/notifications-query.response";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";

@JsonController('notifications')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class NotificationController {
    constructor(@inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/received-notifications')
    @ResponseSchema(NotificationsQueryResponse)
    getReceivedNotifications(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: NotificationsQueryRequest) {
        return this.notificationService.getReceivedNotifications(user.userId, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/sent-notifications')
    @ResponseSchema(NotificationsQueryResponse)
    getSentNotifications(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: NotificationsQueryRequest) {
        return this.notificationService.getSentNotifications(user.userId, queryRequest);
    }
}