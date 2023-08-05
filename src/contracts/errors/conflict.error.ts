import { HttpError } from "routing-controllers";
import { HTTP_CODES } from "../../core/constants/http-codes";

export class ConflictError extends HttpError {
    constructor(message: string = ConflictError.name) {
        super(HTTP_CODES.Conflict, message);
    }
}