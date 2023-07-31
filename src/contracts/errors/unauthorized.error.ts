import { HttpError } from "routing-controllers";
import { HttpCodes } from "../../core/enums/http-codes";

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'An authorization error has occured') {
        super(HttpCodes.Unauthorized, message);
    }
}