import { HttpError } from "routing-controllers";
import { HttpCodes } from "../../core/enums/http-codes";

export class AuthenticationError extends HttpError {
    constructor(message: string = 'An authentication error has occured') {
        super(HttpCodes.Conflict, message);
    }
}