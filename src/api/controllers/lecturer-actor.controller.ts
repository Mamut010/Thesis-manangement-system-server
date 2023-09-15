import { inject, injectable } from "inversify";
import { 
    Authorized,
    Body,
    CurrentUser,
    Get,
    HttpCode,
    JsonController,
    Patch,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { LecturerServiceInterface } from "../interfaces";
import { LecturerRoles } from "../../core/constants/roles";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { 
    BachelorThesisAssessmentInfoDto,
    BachelorThesisEvaluationInfoDto,
    BachelorThesisRegistrationInfoDto,
    LecturerInfoDto,
    OralDefenseAssessmentInfoDto,
    OralDefenseRegistrationInfoDto
} from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { LecturerDetailResponse } from "../../contracts/responses";
import { 
    BachelorThesisAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    LecturerAssetsQueryRequest,
    LecturerInfoUpdateRequest,
    OralDefenseAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest
} from "../../contracts/requests";

@JsonController('lecturer')
@Authorized(LecturerRoles)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class LecturerActorController {
    constructor(@inject(INJECTION_TOKENS.LecturerService) private lecturerService: LecturerServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/info')
    @ResponseSchema(LecturerInfoDto)
    getLecturerInfo(@CurrentUser() user: AuthorizedUser) {
        return this.lecturerService.getLecturerInfo(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/detail')
    @ResponseSchema(LecturerDetailResponse)
    getLecturerDetail(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() lecturerAssetsQueryRequest: LecturerAssetsQueryRequest) {
        return this.lecturerService.getLecturerDetail(user.userId, lecturerAssetsQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-registrations')
    @ResponseSchema(BachelorThesisRegistrationInfoDto, { isArray: true })
    getLecturerBachelorThesisRegistrations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() btrQueryRequest: BachelorThesisRegistrationsQueryRequest) {
        return this.lecturerService.getLecturerBachelorThesisRegistrations(user.userId, btrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-assessments')
    @ResponseSchema(BachelorThesisAssessmentInfoDto, { isArray: true })
    getLecturerBachelorThesisAssessments(@CurrentUser() user: AuthorizedUser,
        @QueryParams() btaQueryRequest: BachelorThesisAssessmentsQueryRequest) {
        return this.lecturerService.getLecturerBachelorThesisAssessments(user.userId, btaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/bachelor-thesis-evaluations')
    @ResponseSchema(BachelorThesisEvaluationInfoDto, { isArray: true })
    getLecturerBachelorThesisEvaluations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() bteQueryRequest: BachelorThesisEvaluationsQueryRequest) {
        return this.lecturerService.getLecturerBachelorThesisEvaluations(user.userId, bteQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/oral-defense-registrations')
    @ResponseSchema(OralDefenseRegistrationInfoDto, { isArray: true })
    getLecturerOralDefenseRegistrations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() odrQueryRequest: OralDefenseRegistrationsQueryRequest) {
        return this.lecturerService.getLecturerOralDefenseRegistrations(user.userId, odrQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/oral-defense-assessments')
    @ResponseSchema(OralDefenseAssessmentInfoDto, { isArray: true })
    getLecturerOralDefenseAssessments(@CurrentUser() user: AuthorizedUser,
        @QueryParams() odaQueryRequest: OralDefenseAssessmentsQueryRequest) {
        return this.lecturerService.getLecturerOralDefenseAssessments(user.userId, odaQueryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/info')
    @ResponseSchema(LecturerInfoDto)
    updateLecturerInfo(@CurrentUser() user: AuthorizedUser,
        @Body({ required: true }) updateRequest: LecturerInfoUpdateRequest) {
        return this.lecturerService.updateLecturerInfo(user.userId, updateRequest);
    }
}