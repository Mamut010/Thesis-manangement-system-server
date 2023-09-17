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
import { LecturerServiceInterface } from "../interfaces";
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
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    LecturerInfosQueryRequest,
    LecturerInfoUpdateRequest,
    SimpleQueryRequest
} from "../../contracts/requests";

@JsonController('lecturers')
@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class LecturerController { 
    constructor(
        @inject(INJECTION_TOKENS.LecturerService) private lecturerService: LecturerServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(LecturerInfosQueryResponse)
    getLecturers(@QueryParams() lecturersQuery: LecturerInfosQueryRequest) {
        return this.lecturerService.getLecturers(lecturersQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(LecturerInfoDto)
    getLecturerInfo(@Param('id') id: string) {
        return this.lecturerService.getLecturerInfo(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/detail')
    @ResponseSchema(LecturerDetailResponse)
    getLecturerDetail(@Param('id') id: string, @QueryParams() queryRequest: SimpleQueryRequest) {
        return this.lecturerService.getLecturerDetail(id, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-registrations')
    @ResponseSchema(BachelorThesisRegistrationInfoDto, { isArray: true })
    getLecturerBachelorThesisRegistrations(@Param('id') id: string, 
        @QueryParams() btrQueryRequest: BachelorThesisRegistrationsQueryRequest) {
        return this.lecturerService.getLecturerBachelorThesisRegistrations(id, btrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentInfoDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@Param('id') id: string, 
        @QueryParams() btaQueryRequest: BachelorThesisAssessmentsQueryRequest) {
        return this.lecturerService.getLecturerBachelorThesisAssessments(id, btaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/bachelor-thesis-evaluations')
    @ResponseSchema(BachelorThesisEvaluationInfoDto, { isArray: true })
    getLecturerBachelorThesisEvaluations(@Param('id') id: string, 
        @QueryParams() bteQueryRequest: BachelorThesisEvaluationsQueryRequest) {
        return this.lecturerService.getLecturerBachelorThesisEvaluations(id, bteQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationInfoDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@Param('id') id: string, 
        @QueryParams() odrQueryRequest: OralDefenseRegistrationsQueryRequest) {
        return this.lecturerService.getLecturerOralDefenseRegistrations(id, odrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Get('/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentInfoDto, { isArray: true })
    getLecturerOralDefenseAssessments(@Param('id') id: string, 
        @QueryParams() odaQueryRequest: OralDefenseAssessmentsQueryRequest) {
        return this.lecturerService.getLecturerOralDefenseAssessments(id, odaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(Role.Admin)
    @Patch('/:id/lecturer-info')
    @ResponseSchema(LecturerInfoDto)
    updateLecturerInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: LecturerInfoUpdateRequest) {
        return this.lecturerService.updateLecturerInfo(id, updateRequest);
    }
}