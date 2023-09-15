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
    @Get('/:id/bachelor-thesis-registration')
    @ResponseSchema(BachelorThesisRegistrationInfoDto)
    getStudentBachelorThesisRegistration(@Param('id') id: string) {
        return this.studentService.getStudentBachelorThesisRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    getStudentBachelorThesisAssessment(@Param('id') id: string) {
        return this.studentService.getStudentBachelorThesisAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-evaluation')
    @ResponseSchema(BachelorThesisEvaluationInfoDto)
    getStudentBachelorThesisEvaluation(@Param('id') id: string) {
        return this.studentService.getStudentBachelorThesisEvaluation(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationInfoDto)
    getStudentOralDefenseRegistration(@Param('id') id: string) {
        return this.studentService.getStudentOralDefenseRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    getStudentOralDefenseAssessment(@Param('id') id: string) {
        return this.studentService.getStudentOralDefenseAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Patch('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    updateStudentInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: StudentInfoUpdateRequest) {
        return this.studentService.updateStudentInfo(id, updateRequest);
    }
}