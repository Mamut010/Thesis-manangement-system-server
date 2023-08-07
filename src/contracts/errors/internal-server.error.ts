import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class InternalServerError extends HttpError {
    constructor(message: string = InternalServerError.name) {
        super(HTTP_CODES.InternalServerError, message);
    }
}