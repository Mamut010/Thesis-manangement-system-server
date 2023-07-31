import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Get, 
    HttpCode, 
    JsonController, 
    Param,
    QueryParams
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ROLES } from "../../core/constants/roles";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminStudentServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { 
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto 
} from "../../shared/dtos";

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
    @Get('/:id')
    @ResponseSchema(StudentDetailResponse)
    getStudentDetail(@Param('id') id: number) {
        return this.adminStudentService.getStudentDetail(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    getStudentInfo(@Param('id') id: number) {
        return this.adminStudentService.getStudentInfo(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-registration')
    @ResponseSchema(BachelorThesisRegistrationDto)
    getStudentBachelorThesisRegistration(@Param('id') id: number) {
        return this.adminStudentService.getStudentBachelorThesisRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationDto)
    getStudentOralDefenseRegistration(@Param('id') id: number) {
        return this.adminStudentService.getStudentOralDefenseRegistration(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentDto)
    getStudentBachelorThesisAssessment(@Param('id') id: number) {
        return this.adminStudentService.getStudentBachelorThesisAssessment(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentDto)
    getStudentOralDefenseAssessment(@Param('id') id: number) {
        return this.adminStudentService.getStudentOralDefenseAssessment(id);
    }
}