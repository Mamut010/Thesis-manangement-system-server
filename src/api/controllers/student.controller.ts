import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
    CurrentUser, 
    HttpCode, 
    JsonController, 
    OnUndefined, 
    Post
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { StudentServiceInterface } from "../interfaces";
import { Role } from "../../core/constants/roles";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { RequestStateInfoDto } from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";

@JsonController('student')
@Authorized(Role.Student)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class StudentController {
    constructor(@inject(INJECTION_TOKENS.StudentService) private studentService: StudentServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/create-thesis-request')
    @ResponseSchema(RequestStateInfoDto)
    @OnUndefined(HTTP_CODES.BadRequest)
    createThesisRequest(@CurrentUser() user: AuthorizedUser,
        @Body({ required: true }) createRequest: ThesisRequestCreateRequest) {
        return this.studentService.createThesisRequest(user.userId, createRequest);
    }
}