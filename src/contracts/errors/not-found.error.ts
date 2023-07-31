import { HttpError } from "routing-controllers";
import { HttpCodes } from "../../core/enums/http-codes";

export class NotFoundError extends HttpError {
    constructor(message: string = NotFoundError.name) {
        super(HttpCodes.NotFound, message);
    }
}