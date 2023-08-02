import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class UnexpectedError extends HttpError {
    constructor(message: string = 'An unexpected error has occured') {
        super(HTTP_CODES.InternalServerError, message);
    }
}