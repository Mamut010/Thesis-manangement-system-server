import { 
    AdminInfoDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
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
    PlainLecturer, 
    PlainOralDefenseAssessment, 
    PlainOralDefenseRegistration, 
    PlainRole, 
    PlainStudent,
    PlainThesis,
} from "../../shared/types/plain-types";

export interface PlainTransformerServiceInterface {
    toRole(plain: PlainRole): RoleDto;
    toAdminInfo(plain: PlainAdmin): AdminInfoDto;
    toStudentInfo(plain: PlainStudent): StudentInfoDto;
    toLecturerInfo(plain: PlainLecturer): LecturerInfoDto;
    toThesisInfo(plain: PlainThesis): ThesisDto;
    toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto;
    toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto;
    toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto;
    toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto;
}