import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'An authorization error has occured') {
        super(HTTP_CODES.Unauthorized, message);
    }
}