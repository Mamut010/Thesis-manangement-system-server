import { inject, injectable } from "inversify";
import { 
    Authorized,
    CurrentUser,
    Get,
    HttpCode,
    JsonController, 
    Param
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminServiceInterface } from "../interfaces";
import { Roles } from "../../core/enums/roles";
import { HttpCodes } from "../../core/enums/http-codes";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { 
    AdminInfoDto,
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto, 
    ThesisInfoDto
} from "../../shared/dtos";
import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { User } from "../../core/models";

@JsonController('admin')
@Authorized(Roles.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminController {
    constructor(
        @inject(INJECTION_TOKENS.AdminService) private adminService: AdminServiceInterface) {

    }

    @HttpCode(HttpCodes.Ok)
    @Get('/admins/my-info')
    @ResponseSchema(AdminInfoDto)
    getAdminInfo(@CurrentUser({ required: true }) user: User) {
        return this.adminService.getAdminInfo(user.userId);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/students/:id')
    @ResponseSchema(StudentDetailResponse)
    getStudentDetail(@Param('id') id: number) {
        return this.adminService.getStudentDetail(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/students/:id/student-info')
    @ResponseSchema(StudentInfoDto)
    getStudentInfo(@Param('id') id: number) {
        return this.adminService.getStudentInfo(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/students/:id/bachelor-thesis-registration')
    @ResponseSchema(BachelorThesisRegistrationDto)
    getStudentBachelorThesisRegistration(@Param('id') id: number) {
        return this.adminService.getStudentBachelorThesisRegistration(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/students/:id/oral-defense-registration')
    @ResponseSchema(OralDefenseRegistrationDto)
    getStudentOralDefenseRegistration(@Param('id') id: number) {
        return this.adminService.getStudentOralDefenseRegistration(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/students/:id/bachelor-thesis-assessment')
    @ResponseSchema(BachelorThesisAssessmentDto)
    getStudentBachelorThesisAssessment(@Param('id') id: number) {
        return this.adminService.getStudentBachelorThesisAssessment(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/students/:id/oral-defense-assessment')
    @ResponseSchema(OralDefenseAssessmentDto)
    getStudentOralDefenseAssessment(@Param('id') id: number) {
        return this.adminService.getStudentOralDefenseAssessment(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/lecturers/:id')
    @ResponseSchema(LecturerDetailResponse)
    getLecturerDetail(@Param('id') id: number) {
        return this.adminService.getLecturerDetail(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/lecturers/:id/lecturer-info')
    @ResponseSchema(StudentInfoDto)
    getLecturerInfo(@Param('id') id: number) {
        return this.adminService.getLecturerInfo(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/lecturers/:id/bachelor-thesis-registrations')
    @ResponseSchema(BachelorThesisRegistrationDto, { isArray: true })
    getLecturerBachelorThesisRegistrations(@Param('id') id: number) {
        return this.adminService.getLecturerBachelorThesisRegistrations(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/lecturers/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@Param('id') id: number) {
        return this.adminService.getLecturerOralDefenseRegistrations(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/lecturers/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@Param('id') id: number) {
        return this.adminService.getLecturerBachelorThesisAssessments(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/lecturers/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentDto, { isArray: true })
    getLecturerOralDefenseAssessments(@Param('id') id: number) {
        return this.adminService.getLecturerOralDefenseAssessments(id);
    }

    @HttpCode(HttpCodes.Ok)
    @Get('/theses/:id/thesis-info')
    @ResponseSchema(ThesisInfoDto)
    getThesisInfo(@Param('id') id: number) {
        return this.adminService.getThesisInfo(id);
    }
}