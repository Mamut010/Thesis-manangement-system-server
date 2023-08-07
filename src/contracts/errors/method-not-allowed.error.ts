import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class MethodNotAllowedError extends HttpError {
    constructor(message: string = MethodNotAllowedError.name) {
        super(HTTP_CODES.MethodNotAllowed, message);
    }
}