import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Get, 
    HttpCode, 
    JsonController, 
    Param
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ROLES } from "../../core/constants/roles";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminLecturerServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { 
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    LecturerInfoDto 
} from "../../shared/dtos";
import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";

@JsonController('admin/lecturers')
//@Authorized(ROLES.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminLecturerController { 
    constructor(
        @inject(INJECTION_TOKENS.AdminLecturerService) private adminLecturerService: AdminLecturerServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(LecturerDetailResponse)
    getLecturerDetail(@Param('id') id: number) {
        return this.adminLecturerService.getLecturerDetail(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/lecturer-info')
    @ResponseSchema(LecturerInfoDto)
    getLecturerInfo(@Param('id') id: number) {
        return this.adminLecturerService.getLecturerInfo(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-registrations')
    @ResponseSchema(BachelorThesisRegistrationDto, { isArray: true })
    getLecturerBachelorThesisRegistrations(@Param('id') id: number) {
        return this.adminLecturerService.getLecturerBachelorThesisRegistrations(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@Param('id') id: number) {
        return this.adminLecturerService.getLecturerOralDefenseRegistrations(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@Param('id') id: number) {
        return this.adminLecturerService.getLecturerBachelorThesisAssessments(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentDto, { isArray: true })
    getLecturerOralDefenseAssessments(@Param('id') id: number) {
        return this.adminLecturerService.getLecturerOralDefenseAssessments(id);
    }
}