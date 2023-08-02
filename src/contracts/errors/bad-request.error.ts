import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class BadRequestError extends HttpError {
    constructor(message: string = BadRequestError.name) {
        super(HTTP_CODES.BadRequest, message);
    }
}