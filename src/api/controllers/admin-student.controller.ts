import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Get, 
    HttpCode, 
    JsonController, 
    Param
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Roles } from "../../core/enums/roles";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminStudentServiceInterface } from "../interfaces";
import { HttpCodes } from "../../core/enums/http-codes";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { 
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto 
} from "../../shared/dtos";

@JsonController('admin/students')
//@Authorized(Roles.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminStudentController { 
    constructor(
        @inject(INJECTION_TOKENS.AdminStudentService) private adminStudentService: AdminStudentServiceInterface) {

    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id')
    @ResponseSchema(StudentDetailResponse)
    getStudentDetail(@Param('id') id: number) {
        return this.adminStudentService.getStudentDetail(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    getStudentInfo(@Param('id') id: number) {
        return this.adminStudentService.getStudentInfo(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id/bachelor-thesis-registration')
    @ResponseSchema(BachelorThesisRegistrationDto)
    getStudentBachelorThesisRegistration(@Param('id') id: number) {
        return this.adminStudentService.getStudentBachelorThesisRegistration(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationDto)
    getStudentOralDefenseRegistration(@Param('id') id: number) {
        return this.adminStudentService.getStudentOralDefenseRegistration(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentDto)
    getStudentBachelorThesisAssessment(@Param('id') id: number) {
        return this.adminStudentService.getStudentBachelorThesisAssessment(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentDto)
    getStudentOralDefenseAssessment(@Param('id') id: number) {
        return this.adminStudentService.getStudentOralDefenseAssessment(id);
    }
}