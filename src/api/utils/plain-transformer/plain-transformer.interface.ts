import { 
    AdminInfoDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    FieldDto, 
    LecturerInfoDto, 
    LocationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    RoleDto, 
    StudentInfoDto,
    ThesisDto,
    TopicDto
} from "../../../shared/dtos";
import { 
    PlainAdmin,
    PlainBachelorThesisAssessment,
    PlainBachelorThesisRegistration, 
    PlainField, 
    PlainLecturer, 
    PlainLocation, 
    PlainOralDefenseAssessment, 
    PlainOralDefenseRegistration, 
    PlainRole, 
    PlainStudent,
    PlainThesis,
    PlainTopic,
} from "../../../shared/types/plain-types";

export interface PlainTransformerInterface {
    toAdminInfo(plain: PlainAdmin): AdminInfoDto;
    toStudentInfo(plain: PlainStudent): StudentInfoDto;
    toLecturerInfo(plain: PlainLecturer): LecturerInfoDto;
    toRole(plain: PlainRole): RoleDto;
    toThesis(plain: PlainThesis): ThesisDto;
    toField(plain: PlainField): FieldDto;
    toTopic(plain: PlainTopic): TopicDto;
    toLocation(plain: PlainLocation): LocationDto;
    toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto;
    toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto;
    toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto;
    toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto;
}