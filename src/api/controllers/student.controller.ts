import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
    CurrentUser, 
    Get, 
    HttpCode, 
    JsonController, 
    OnUndefined, 
    Patch, 
    Post
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { StudentServiceInterface } from "../interfaces";
import { Role } from "../../core/constants/roles";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { 
    BachelorThesisAssessmentInfoDto,
    BachelorThesisEvaluationInfoDto,
    BachelorThesisRegistrationInfoDto,
    OralDefenseAssessmentInfoDto,
    OralDefenseRegistrationInfoDto,
    RequestStateInfoDto,
    StudentInfoDto
} from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";
import { StudentInfoUpdateRequest } from "../../contracts/requests";
import { StudentDetailResponse } from "../../contracts/responses";

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
    @Get('/info')
    @ResponseSchema(StudentInfoDto)
    getStudentInfo(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentInfo(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/detail')
    @ResponseSchema(StudentDetailResponse)
    getStudentDetail(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentDetail(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-registration')
    @ResponseSchema(BachelorThesisRegistrationInfoDto)
    getStudentBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentBachelorThesisRegistration(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    getStudentBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentBachelorThesisAssessment(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-evaluation')
    @ResponseSchema(BachelorThesisEvaluationInfoDto)
    getStudentBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentBachelorThesisEvaluation(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationInfoDto)
    getStudentOralDefenseRegistration(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentOralDefenseRegistration(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    getStudentOralDefenseAssessment(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentOralDefenseAssessment(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/info')
    @ResponseSchema(StudentInfoDto)
    updateAdminInfo(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) updateRequest: StudentInfoUpdateRequest) {
        return this.studentService.updateStudentInfo(user.userId, updateRequest);
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