import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class ForbiddenError extends HttpError {
    constructor(message: string = ForbiddenError.name) {
        super(HTTP_CODES.Forbidden, message);
    }
}