import { 
    AdminDto,
    AdminInfoDto, 
    BachelorThesisAssessmentDto, 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationDto, 
    BachelorThesisRegistrationInfoDto, 
    LecturerDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationDto, 
    OralDefenseRegistrationInfoDto, 
    StudentDto,
    StudentInfoDto,
    UserDto,
    UserInfoDto
} from "../../dtos";

export interface InfoMapperInterface {
    mapUser(dto: UserDto): UserInfoDto;
    mapUser(dto: UserDto[]): UserInfoDto[];

    mapAdmin(dto: AdminDto): AdminInfoDto;
    mapAdmin(dto: AdminDto[]): AdminInfoDto[];

    mapStudent(dto: StudentDto): StudentInfoDto;
    mapStudent(dto: StudentDto[]): StudentInfoDto[];

    mapLecturer(dto: LecturerDto): LecturerInfoDto;
    mapLecturer(dto: LecturerDto[]): LecturerInfoDto[];

    mapBachelorThesisRegistration(dto: BachelorThesisRegistrationDto): BachelorThesisRegistrationInfoDto;
    mapBachelorThesisRegistration(dto: BachelorThesisRegistrationDto[]): BachelorThesisRegistrationInfoDto[];

    mapBachelorThesisAssessment(dto: BachelorThesisAssessmentDto): BachelorThesisAssessmentInfoDto;
    mapBachelorThesisAssessment(dto: BachelorThesisAssessmentDto[]): BachelorThesisAssessmentInfoDto[];

    mapBachelorThesisEvaluation(dto: BachelorThesisEvaluationDto): BachelorThesisEvaluationInfoDto;
    mapBachelorThesisEvaluation(dto: BachelorThesisEvaluationDto[]): BachelorThesisEvaluationInfoDto[];

    mapOralDefenseRegistration(dto: OralDefenseRegistrationDto): OralDefenseRegistrationInfoDto;
    mapOralDefenseRegistration(dto: OralDefenseRegistrationDto[]): OralDefenseRegistrationInfoDto[];

    mapOralDefenseAssessment(dto: OralDefenseAssessmentDto): OralDefenseAssessmentInfoDto;
    mapOralDefenseAssessment(dto: OralDefenseAssessmentDto[]): OralDefenseAssessmentInfoDto[] ;
}