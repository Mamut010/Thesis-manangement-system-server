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
    LecturerInfoDto 
} from "../../shared/dtos";
import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturerAssetsQueryRequest } from "../../contracts/requests/lecturer-assets-query.request";

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
        @QueryParams() lecturerAssetsQueryRequest: LecturerAssetsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisRegistrations(id, lecturerAssetsQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@Param('id') id: string, 
        @QueryParams() lecturerAssetsQueryRequest: LecturerAssetsQueryRequest) {
        return this.adminLecturerService.getLecturerOralDefenseRegistrations(id, lecturerAssetsQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@Param('id') id: string, 
        @QueryParams() lecturerAssetsQueryRequest: LecturerAssetsQueryRequest) {
        return this.adminLecturerService.getLecturerBachelorThesisAssessments(id, lecturerAssetsQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentDto, { isArray: true })
    getLecturerOralDefenseAssessments(@Param('id') id: string, 
        @QueryParams() lecturerAssetsQueryRequest: LecturerAssetsQueryRequest) {
        return this.adminLecturerService.getLecturerOralDefenseAssessments(id, lecturerAssetsQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/:id/lecturer-info')
    updateLecturerInfo(@Param('id') id: string, @Body({ required: true }) updateRequest: LecturerUpdateRequest) {
        return this.adminLecturerService.updateLecturerInfo(id, updateRequest);
    }
}