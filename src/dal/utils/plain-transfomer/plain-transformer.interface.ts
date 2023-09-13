import { 
    AdminDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    FieldDto, 
    GroupDto, 
    LecturerDto, 
    LocationDto, 
    NotificationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    ProcessDto, 
    ProgramDto, 
    RefreshTokenDto, 
    RequestDataDto, 
    RequestDto, 
    RequestStakeholderDto, 
    RoleDto, 
    StudentDto,
    ThesisDto,
    TopicDto,
    UserDto
} from "../../../shared/dtos";
import { 
    PlainAdmin,
    PlainBachelorThesisAssessment,
    PlainBachelorThesisEvaluation,
    PlainBachelorThesisRegistration, 
    PlainField, 
    PlainGroup, 
    PlainLecturer, 
    PlainLocation, 
    PlainNotification, 
    PlainOralDefenseAssessment, 
    PlainOralDefenseRegistration, 
    PlainProcess, 
    PlainProgram, 
    PlainRefreshToken, 
    PlainRequest, 
    PlainRequestData, 
    PlainRequestStakeholder, 
    PlainRole, 
    PlainStudent,
    PlainThesis,
    PlainTopic,
    PlainUser,
} from "../../types/plain-types";

export interface PlainTransformerInterface {
    toUser(plain: PlainUser): UserDto;
    toRefreshToken(plain: PlainRefreshToken): RefreshTokenDto;
    toNotification(plain: PlainNotification): NotificationDto;
    toAdmin(plain: PlainAdmin): AdminDto;
    toStudent(plain: PlainStudent): StudentDto;
    toLecturer(plain: PlainLecturer): LecturerDto;
    toRole(plain: PlainRole): RoleDto;
    toThesis(plain: PlainThesis): ThesisDto;
    toProgram(plain: PlainProgram): ProgramDto;
    toField(plain: PlainField): FieldDto;
    toTopic(plain: PlainTopic): TopicDto;
    toLocation(plain: PlainLocation): LocationDto;
    toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto;
    toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto;
    toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto;
    toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto;
    toBachelorThesisEvaluation(plain: PlainBachelorThesisEvaluation): BachelorThesisEvaluationDto;

    toProcess(plain: PlainProcess): ProcessDto;
    toRequest(plain: PlainRequest): RequestDto;
    toGroup(plain: PlainGroup): GroupDto;
    toRequestData(plain: PlainRequestData): RequestDataDto;
    toRequestStakeholder(requestId: string, plains: PlainRequestStakeholder[]): RequestStakeholderDto;
}