import { injectable } from "inversify";
import { InfoMapperInterface } from "./info-mapper.interface";
import { 
    AdminDto,
    AdminInfoDto, BachelorThesisAssessmentDto, BachelorThesisAssessmentInfoDto, BachelorThesisEvaluationDto, BachelorThesisEvaluationInfoDto, BachelorThesisRegistrationDto, BachelorThesisRegistrationInfoDto, LecturerDto, LecturerInfoDto, OralDefenseAssessmentDto, OralDefenseAssessmentInfoDto, OralDefenseRegistrationDto, OralDefenseRegistrationInfoDto, StudentDto, StudentInfoDto, UserDto, UserInfoDto 
} from "../../dtos";
import { ClassConstructor, IsArray, NotArray } from "../../../utils/types";
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";
import { SingleOrArray } from "../../../utils/object-helpers";

@injectable()
export class InfoMapper implements InfoMapperInterface {
    mapUser(dto: UserDto): UserInfoDto;
    mapUser(dto: UserDto[]): UserInfoDto[];
    mapUser(dto: SingleOrArray<UserDto>): SingleOrArray<UserInfoDto> {
        return plainToInstanceExactMatch(UserInfoDto, dto);
    }

    mapAdmin(dto: AdminDto): AdminInfoDto;
    mapAdmin(dto: AdminDto[]): AdminInfoDto[];
    mapAdmin(dto: SingleOrArray<AdminDto>): SingleOrArray<AdminInfoDto> {
        return plainToInstanceExactMatch(AdminInfoDto, dto);
    }

    mapStudent(dto: StudentDto): StudentInfoDto;
    mapStudent(dto: StudentDto[]): StudentInfoDto[];
    mapStudent(dto: SingleOrArray<StudentDto>): SingleOrArray<StudentInfoDto> {
        return plainToInstanceExactMatch(StudentInfoDto, dto);
    }

    mapLecturer(dto: LecturerDto): LecturerInfoDto;
    mapLecturer(dto: LecturerDto[]): LecturerInfoDto[];
    mapLecturer(dto: SingleOrArray<LecturerDto>): SingleOrArray<LecturerInfoDto> {
        return plainToInstanceExactMatch(LecturerInfoDto, dto);
    }

    mapBachelorThesisRegistration(dto: BachelorThesisRegistrationDto): BachelorThesisRegistrationInfoDto;
    mapBachelorThesisRegistration(dto: BachelorThesisRegistrationDto[]): BachelorThesisRegistrationInfoDto[];
    mapBachelorThesisRegistration(dto: SingleOrArray<BachelorThesisRegistrationDto>): SingleOrArray<BachelorThesisRegistrationInfoDto> {
        return plainToInstanceExactMatch(BachelorThesisRegistrationInfoDto, dto);
    }

    mapBachelorThesisAssessment(dto: BachelorThesisAssessmentDto): BachelorThesisAssessmentInfoDto;
    mapBachelorThesisAssessment(dto: BachelorThesisAssessmentDto[]): BachelorThesisAssessmentInfoDto[];
    mapBachelorThesisAssessment(dto: SingleOrArray<BachelorThesisAssessmentDto>): SingleOrArray<BachelorThesisAssessmentInfoDto> {
        return plainToInstanceExactMatch(BachelorThesisAssessmentInfoDto, dto);
    }

    mapBachelorThesisEvaluation(dto: BachelorThesisEvaluationDto): BachelorThesisEvaluationInfoDto;
    mapBachelorThesisEvaluation(dto: BachelorThesisEvaluationDto[]): BachelorThesisEvaluationInfoDto[];
    mapBachelorThesisEvaluation(dto: SingleOrArray<BachelorThesisEvaluationDto>): SingleOrArray<BachelorThesisEvaluationInfoDto> {
        return plainToInstanceExactMatch(BachelorThesisEvaluationInfoDto, dto);
    }

    mapOralDefenseRegistration(dto: OralDefenseRegistrationDto): OralDefenseRegistrationInfoDto;
    mapOralDefenseRegistration(dto: OralDefenseRegistrationDto[]): OralDefenseRegistrationInfoDto[];
    mapOralDefenseRegistration(dto: SingleOrArray<OralDefenseRegistrationDto>): SingleOrArray<OralDefenseRegistrationInfoDto> {
        return plainToInstanceExactMatch(OralDefenseRegistrationInfoDto, dto);
    }

    mapOralDefenseAssessment(dto: OralDefenseAssessmentDto): OralDefenseAssessmentInfoDto;
    mapOralDefenseAssessment(dto: OralDefenseAssessmentDto[]): OralDefenseAssessmentInfoDto[];
    mapOralDefenseAssessment(dto: SingleOrArray<OralDefenseAssessmentDto>): SingleOrArray<OralDefenseAssessmentInfoDto> {
        return plainToInstanceExactMatch(OralDefenseAssessmentDto, dto);
    }
}