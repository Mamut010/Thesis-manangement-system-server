import { 
    AdminInfoDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    FieldDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    RoleDto, 
    StudentInfoDto,
    ThesisDto
} from "../../shared/dtos";
import { 
    PlainAdmin,
    PlainBachelorThesisAssessment,
    PlainBachelorThesisRegistration, 
    PlainField, 
    PlainLecturer, 
    PlainOralDefenseAssessment, 
    PlainOralDefenseRegistration, 
    PlainRole, 
    PlainStudent,
    PlainThesis,
} from "../../shared/types/plain-types";

export interface PlainTransformerServiceInterface {
    toAdminInfo(plain: PlainAdmin): AdminInfoDto;
    toStudentInfo(plain: PlainStudent): StudentInfoDto;
    toLecturerInfo(plain: PlainLecturer): LecturerInfoDto;
    toRole(plain: PlainRole): RoleDto;
    toThesis(plain: PlainThesis): ThesisDto;
    toField(plain: PlainField): FieldDto;
    toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto;
    toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto;
    toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto;
    toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto;
}