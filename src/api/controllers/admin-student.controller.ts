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
import { AdminStudentServiceInterface } from "../interfaces";
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

@JsonController('admin/students')
//@Authorized(Role.Admin)
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
    @ResponseSchema(StudentInfosQueryResponse)
    getStudents(@QueryParams() studentsQuery: StudentInfosQueryRequest) {
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
    @ResponseSchema(BachelorThesisRegistrationInfoDto)
    getStudentBachelorThesisRegistration(@Param('id') id: string) {
        return this.adminStudentService.getStudentBachelorThesisRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    getStudentBachelorThesisAssessment(@Param('id') id: string) {
        return this.adminStudentService.getStudentBachelorThesisAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-evaluation')
    @ResponseSchema(BachelorThesisEvaluationInfoDto)
    getStudentBachelorThesisEvaluation(@Param('id') id: string) {
        return this.adminStudentService.getStudentBachelorThesisEvaluation(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationInfoDto)
    getStudentOralDefenseRegistration(@Param('id') id: string) {
        return this.adminStudentService.getStudentOralDefenseRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    getStudentOralDefenseAssessment(@Param('id') id: string) {
        return this.adminStudentService.getStudentOralDefenseAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    updateStudentInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: StudentInfoUpdateRequest) {
        return this.adminStudentService.updateStudent(id, updateRequest);
    }
}