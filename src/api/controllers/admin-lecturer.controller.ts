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
import { AdminLecturerServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { 
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    LecturerInfoDto, 
    BachelorThesisEvaluationDto
} from "../../shared/dtos";
import { LecturerDetailResponse } from "../../contracts/responses/api/lecturer-info.response";
import { LecturersQueryResponse } from "../../contracts/responses/api/lecturers-query.response";
import { LecturersQueryRequest } from "../../contracts/requests/api/lecturers-query.request";
import { LecturerUpdateRequest } from "../../contracts/requests/api/lecturer-update.request";
import { LecturerAssetsQueryRequest } from "../../contracts/requests/api/lecturer-assets-query.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";
import { BachelorThesisEvaluationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";

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
    @Get()
    @ResponseSchema(LecturersQueryResponse)
    getLecturers(@QueryParams() lecturersQuery: LecturersQueryRequest) {
        return this.adminLecturerService.getLecturers(lecturersQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/lecturer-info')
    @ResponseSchema(LecturerInfoDto)
    getLecturerInfo(@Param('id') id: string) {
        return this.adminLecturerService.getLecturerInfo(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(LecturerDetailResponse)
    getLecturerDetail(@Param('id') id: string, @QueryParams() lecturerAssetsQueryRequest: LecturerAssetsQueryRequest) {
        return this.adminLecturerService.getLecturerDetail(id, lecturerAssetsQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-registrations')
    @ResponseSchema(BachelorThesisRegistrationDto, { isArray: true })
    getLecturerBachelorThesisRegistrations(@Param('id') id: string, 
        @QueryParams() btrQueryRequest: BachelorThesisRegistrationsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisRegistrations(id, btrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@Param('id') id: string, 
        @QueryParams() btaQueryRequest: BachelorThesisAssessmentsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisAssessments(id, btaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-evaluations')
    @ResponseSchema(BachelorThesisEvaluationDto, { isArray: true })
    getLecturerBachelorThesisEvaluations(@Param('id') id: string, 
        @QueryParams() bteQueryRequest: BachelorThesisEvaluationsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisEvaluations(id, bteQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@Param('id') id: string, 
        @QueryParams() odrQueryRequest: OralDefenseRegistrationsQueryRequest) {
        return this.adminLecturerService.getLecturerOralDefenseRegistrations(id, odrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentDto, { isArray: true })
    getLecturerOralDefenseAssessments(@Param('id') id: string, 
        @QueryParams() odaQueryRequest: OralDefenseAssessmentsQueryRequest) {
        return this.adminLecturerService.getLecturerOralDefenseAssessments(id, odaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/:id/lecturer-info')
    updateLecturerInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: LecturerUpdateRequest) {
        return this.adminLecturerService.updateLecturerInfo(id, updateRequest);
    }
}