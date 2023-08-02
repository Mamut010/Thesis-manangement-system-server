import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class NotFoundError extends HttpError {
    constructor(message: string = NotFoundError.name) {
        super(HTTP_CODES.NotFound, message);
    }
}