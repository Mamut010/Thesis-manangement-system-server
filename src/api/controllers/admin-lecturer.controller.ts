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
import { ROLES } from "../../core/constants/roles";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminLecturerServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import {
    LecturerInfoDto,
    BachelorThesisRegistrationInfoDto,
    BachelorThesisAssessmentInfoDto,
    BachelorThesisEvaluationInfoDto,
    OralDefenseRegistrationInfoDto,
    OralDefenseAssessmentInfoDto
} from "../../shared/dtos";
import { LecturerDetailResponse, LecturerInfosQueryResponse } from "../../contracts/responses";
import { 
    LecturerAssetsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    LecturerInfosQueryRequest,
    LecturerInfoUpdateRequest
} from "../../contracts/requests";

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
    @ResponseSchema(LecturerInfosQueryResponse)
    getLecturers(@QueryParams() lecturersQuery: LecturerInfosQueryRequest) {
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
    @ResponseSchema(BachelorThesisRegistrationInfoDto, { isArray: true })
    getLecturerBachelorThesisRegistrations(@Param('id') id: string, 
        @QueryParams() btrQueryRequest: BachelorThesisRegistrationsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisRegistrations(id, btrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentInfoDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@Param('id') id: string, 
        @QueryParams() btaQueryRequest: BachelorThesisAssessmentsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisAssessments(id, btaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-evaluations')
    @ResponseSchema(BachelorThesisEvaluationInfoDto, { isArray: true })
    getLecturerBachelorThesisEvaluations(@Param('id') id: string, 
        @QueryParams() bteQueryRequest: BachelorThesisEvaluationsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisEvaluations(id, bteQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationInfoDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@Param('id') id: string, 
        @QueryParams() odrQueryRequest: OralDefenseRegistrationsQueryRequest) {
        return this.adminLecturerService.getLecturerOralDefenseRegistrations(id, odrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentInfoDto, { isArray: true })
    getLecturerOralDefenseAssessments(@Param('id') id: string, 
        @QueryParams() odaQueryRequest: OralDefenseAssessmentsQueryRequest) {
        return this.adminLecturerService.getLecturerOralDefenseAssessments(id, odaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/:id/lecturer-info')
    @ResponseSchema(LecturerInfoDto)
    updateLecturerInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: LecturerInfoUpdateRequest) {
        return this.adminLecturerService.updateLecturerInfo(id, updateRequest);
    }
}