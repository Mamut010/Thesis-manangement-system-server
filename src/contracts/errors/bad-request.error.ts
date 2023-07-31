import { HttpError } from "routing-controllers";
import { HttpCodes } from "../../core/enums/http-codes";

export class BadRequestError extends HttpError {
    constructor(message: string = BadRequestError.name) {
        super(HttpCodes.BadRequest, message);
    }
}