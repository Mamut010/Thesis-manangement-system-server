import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
    Get, 
    HttpCode, 
    JsonController, 
    Param,
    Patch,
    QueryParams
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Role } from "../../core/constants/roles";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { StudentDetailResponse, StudentInfosQueryResponse } from "../../contracts/responses";
import { 
    BachelorThesisAssessmentInfoDto,
    BachelorThesisEvaluationInfoDto,
    BachelorThesisRegistrationInfoDto,
    OralDefenseAssessmentInfoDto,
    OralDefenseRegistrationInfoDto, 
    StudentInfoDto 
} from "../../shared/dtos";
import { StudentInfosQueryRequest, StudentInfoUpdateRequest } from "../../contracts/requests";
import { StudentServiceInterface } from "../interfaces";

@JsonController('students')
@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class StudentController { 
    constructor(
        @inject(INJECTION_TOKENS.StudentService) private studentService: StudentServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(StudentInfosQueryResponse)
    getStudents(@QueryParams() studentsQuery: StudentInfosQueryRequest) {
        return this.studentService.getStudents(studentsQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(StudentInfoDto)
    getStudentInfo(@Param('id') id: string) {
        return this.studentService.getStudentInfo(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/detail')
    @ResponseSchema(StudentDetailResponse)
    getStudentDetail(@Param('id') id: string) {
        return this.studentService.getStudentDetail(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-registrations')
    @ResponseSchema(BachelorThesisRegistrationInfoDto, { isArray: true })
    getStudentBachelorThesisRegistrations(@Param('id') id: string) {
        return this.studentService.getStudentBachelorThesisRegistrations(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentInfoDto, { isArray: true })
    getStudentBachelorThesisAssessments(@Param('id') id: string) {
        return this.studentService.getStudentBachelorThesisAssessments(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-evaluations')
    @ResponseSchema(BachelorThesisEvaluationInfoDto, { isArray: true })
    getStudentBachelorThesisEvaluations(@Param('id') id: string) {
        return this.studentService.getStudentBachelorThesisEvaluations(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationInfoDto, { isArray: true })
    getStudentOralDefenseRegistrations(@Param('id') id: string) {
        return this.studentService.getStudentOralDefenseRegistrations(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentInfoDto, { isArray: true })
    getStudentOralDefenseAssessments(@Param('id') id: string) {
        return this.studentService.getStudentOralDefenseAssessments(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Patch('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    updateStudentInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: StudentInfoUpdateRequest) {
        return this.studentService.updateStudentInfo(id, updateRequest);
    }
}