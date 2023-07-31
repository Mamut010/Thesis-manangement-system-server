import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class AuthenticationError extends HttpError {
    constructor(message: string = 'An authentication error has occured') {
        super(HTTP_CODES.Conflict, message);
    }
}