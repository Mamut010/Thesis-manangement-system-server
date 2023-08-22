import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
    Get, 
    HttpCode, 
    JsonController, 
    Param,
    Post,
    QueryParams
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ROLES } from "../../core/constants/roles";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminStudentServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { StudentDetailResponse } from "../../contracts/responses/api/student-info.response";
import { 
    BachelorThesisAssessmentDto,
    BachelorThesisEvaluationDto,
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto 
} from "../../shared/dtos";
import { StudentsQueryRequest } from "../../contracts/requests/api/students-query.request";
import { StudentUpdateRequest } from "../../contracts/requests/api/student-update.request";
import { StudentsQueryResponse } from "../../contracts/responses/api/students-query.response";

@JsonController('admin/students')
//@Authorized(ROLES.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminStudentController { 
    constructor(
        @inject(INJECTION_TOKENS.AdminStudentService) private adminStudentService: AdminStudentServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(StudentsQueryResponse)
    getStudents(@QueryParams() studentsQuery: StudentsQueryRequest) {
        return this.adminStudentService.getStudents(studentsQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(StudentDetailResponse)
    getStudentDetail(@Param('id') id: string) {
        return this.adminStudentService.getStudentDetail(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    getStudentInfo(@Param('id') id: string) {
        return this.adminStudentService.getStudentInfo(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-registration')
    @ResponseSchema(BachelorThesisRegistrationDto)
    getStudentBachelorThesisRegistration(@Param('id') id: string) {
        return this.adminStudentService.getStudentBachelorThesisRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentDto)
    getStudentBachelorThesisAssessment(@Param('id') id: string) {
        return this.adminStudentService.getStudentBachelorThesisAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-evaluation')
    @ResponseSchema(BachelorThesisEvaluationDto)
    getStudentBachelorThesisEvaluation(@Param('id') id: string) {
        return this.adminStudentService.getStudentBachelorThesisEvaluation(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationDto)
    getStudentOralDefenseRegistration(@Param('id') id: string) {
        return this.adminStudentService.getStudentOralDefenseRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentDto)
    getStudentOralDefenseAssessment(@Param('id') id: string) {
        return this.adminStudentService.getStudentOralDefenseAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    updateStudentInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: StudentUpdateRequest) {
        return this.adminStudentService.updateStudent(id, updateRequest);
    }
}