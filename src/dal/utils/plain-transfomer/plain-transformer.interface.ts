import { 
    AdminDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    FieldDto, 
    LecturerDto, 
    LocationDto, 
    NotificationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    RefreshTokenDto, 
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
    PlainLecturer, 
    PlainLocation, 
    PlainNotification, 
    PlainOralDefenseAssessment, 
    PlainOralDefenseRegistration, 
    PlainRefreshToken, 
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
    toAdminInfo(plain: PlainAdmin): AdminDto;
    toStudentInfo(plain: PlainStudent): StudentDto;
    toLecturerInfo(plain: PlainLecturer): LecturerDto;
    toRole(plain: PlainRole): RoleDto;
    toThesis(plain: PlainThesis): ThesisDto;
    toField(plain: PlainField): FieldDto;
    toTopic(plain: PlainTopic): TopicDto;
    toLocation(plain: PlainLocation): LocationDto;
    toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto;
    toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto;
    toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto;
    toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto;
    toBachelorThesisEvaluation(plain: PlainBachelorThesisEvaluation): BachelorThesisEvaluationDto;
}