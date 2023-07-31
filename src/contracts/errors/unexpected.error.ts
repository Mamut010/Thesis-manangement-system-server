import { HttpError } from "routing-controllers";
import { HttpCodes } from "../../core/enums/http-codes";

export class UnexpectedError extends HttpError {
    constructor(message: string = 'An unexpected error has occured') {
        super(HttpCodes.InternalServerError, message);
    }
}