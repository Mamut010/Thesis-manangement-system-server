import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
    CurrentUser, 
    Get, 
    HttpCode, 
    JsonController,
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
export class StudentActorController {
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
    @ResponseSchema(BachelorThesisRegistrationInfoDto, { isArray: true })
    getStudentBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentBachelorThesisRegistrations(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentInfoDto, { isArray: true })
    getStudentBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentBachelorThesisAssessments(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-evaluation')
    @ResponseSchema(BachelorThesisEvaluationInfoDto, { isArray: true })
    getStudentBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentBachelorThesisEvaluations(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationInfoDto, { isArray: true })
    getStudentOralDefenseRegistration(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentOralDefenseRegistrations(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentInfoDto, { isArray: true })
    getStudentOralDefenseAssessment(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getStudentOralDefenseAssessments(user.userId);
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
    createThesisRequest(@CurrentUser() user: AuthorizedUser,
        @Body({ required: true }) createRequest: ThesisRequestCreateRequest) {
        return this.studentService.createThesisRequest(user.userId, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/latest-created-request')
    @ResponseSchema(RequestStateInfoDto)
    getLatestCreatedRequestState(@CurrentUser() user: AuthorizedUser) {
        return this.studentService.getLatestCreatedRequestState(user.userId);
    }
}