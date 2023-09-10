import { inject, injectable } from "inversify";
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
    RoleDto, 
    StudentDto,
    ThesisDto,
    TopicDto,
    UserDto
} from "../../../shared/dtos";
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";
import { flattenObject } from "../../../utils/object-helpers";
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
    PlainRole, 
    PlainStudent,
    PlainThesis,
    PlainTopic,
    PlainUser
} from "../../types/plain-types";
import { PlainTransformerInterface } from "./plain-transformer.interface";
import { StateType } from "../../../api/others/workflow";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { CryptoServiceInterface } from "../../../shared/interfaces";
import { wrapDecryptionError } from "../../../utils/cipher-helpers";
import { RequestData } from "@prisma/client";

@injectable()
export class PlainTransformer implements PlainTransformerInterface {
    private static readonly bachelorThesisAndOralDefenseRelations 
        = ['thesis', 'admin', 'supervisor', 'supervisor1', 'supervisor2'];

    constructor(@inject(INJECTION_TOKENS.CryptoService) private cryptoService: CryptoServiceInterface) {

    }

    public toUser(plain: PlainUser): UserDto {
        const dto = plainToInstanceExactMatch(UserDto, flattenObject(plain, {
            transformedProps: ['role']
        }));
        this.tryDecryptingEmail(dto);
        return dto;
    }

    public toRefreshToken(plain: PlainRefreshToken): RefreshTokenDto {
        const dto = plainToInstanceExactMatch(RefreshTokenDto, plain);
        return dto;
    }

    public toNotification(plain: PlainNotification): NotificationDto {
        const dto = plainToInstanceExactMatch(NotificationDto, plain);
        return dto;
    }

    public toAdmin(plain: PlainAdmin): AdminDto {
        const dto = plainToInstanceExactMatch(AdminDto, flattenObject(plain));

        this.tryDecryptingEmail(dto);
        dto.adminId = plain.userId;

        return dto;
    }

    public toStudent(plain: PlainStudent): StudentDto {
        const dto = plainToInstanceExactMatch(StudentDto, flattenObject(plain,{
            transformedProps: ['program']
        }));

        this.tryDecryptingEmail(dto);
        dto.studentId = plain.userId;
        
        return dto;
    }

    public toLecturer(plain: PlainLecturer): LecturerDto {
        const dto = plainToInstanceExactMatch(LecturerDto, flattenObject(plain, {
            transformedProps: ['role']
        }));

        this.tryDecryptingEmail(dto);
        dto.lecturerId = plain.userId;
        dto.type = plain.user.role.name;
        
        return dto;
    }

    public toThesis(plain: PlainThesis): ThesisDto {
        const dto = plainToInstanceExactMatch(ThesisDto, flattenObject(plain, {
            transformedProps: ['topic', 'field'],
        }));

        return dto;
    }

    public toRole(plain: PlainRole): RoleDto {
        const dto = plainToInstanceExactMatch(RoleDto, plain);
        return dto;
    }

    public toProgram(plain: PlainProgram): ProgramDto {
        const dto = plainToInstanceExactMatch(ProgramDto, plain);
        return dto;
    }

    public toField(plain: PlainField): FieldDto {
        const dto = plainToInstanceExactMatch(FieldDto, plain);
        return dto;
    }

    public toTopic(plain: PlainTopic): TopicDto {
        const dto = plainToInstanceExactMatch(TopicDto, plain);
        return dto;
    }

    public toLocation(plain: PlainLocation): LocationDto {
        const dto = plainToInstanceExactMatch(LocationDto, plain);
        return dto;
    }

    public toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisRegistrationDto, plain);
        dto.studentSignature = plain.student.signature;
        dto.adminSignature = plain.admin?.signature ?? null;
        return dto;
    }

    public toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(OralDefenseRegistrationDto, plain);
        dto.studentSignature = plain.student.signature;
        return dto;
    }

    public toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisAssessmentDto, plain);
        dto.studentSignature = plain.student.signature;
        dto.overallGrade = this.computeOverallGrade(dto.supervisor1Grade, dto.supervisor2Grade);
        return dto;
    }

    public toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(OralDefenseAssessmentDto, plain);
        dto.studentSignature = plain.student.signature;
        dto.overallGrade = this.computeOverallGrade(dto.supervisor1Grade, dto.supervisor2Grade);
        return dto;
    }

    public toBachelorThesisEvaluation(plain: PlainBachelorThesisEvaluation): BachelorThesisEvaluationDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisEvaluationDto, plain);
        return dto;
    }

    public toProcess(plain: PlainProcess): ProcessDto {
        const dto = plainToInstanceExactMatch(ProcessDto, plain);
        return dto;
    }

    public toRequest(plain: PlainRequest): RequestDto {
        const dto = plainToInstanceExactMatch(RequestDto, plain);
        dto.creatorId = plain.userId;
        dto.stakeholderIds = plain.stakeholders.map(item => item.userId);
        dto.state = plain.state.name;
        dto.stateDescription = plain.state.description;
        dto.stateType = plain.state.stateType.name as StateType;
        return dto;
    }

    public toGroup(plain: PlainGroup): GroupDto {
        const dto = plainToInstanceExactMatch(GroupDto, plain);
        dto.memberIds = plain.users.map(item => item.userId);
        return dto;
    }

    public toRequestData(plain: RequestData): RequestDataDto {
        const dto = plainToInstanceExactMatch(RequestDataDto, plain);
        return dto;
    }

    private toBachelorThesisOrOralDefenseDto<T>(cls: new (...args: any[]) => T, plain: object): T {
        return plainToInstanceExactMatch(cls, flattenObject(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformer.bachelorThesisAndOralDefenseRelations,
        }));
    }

    private computeOverallGrade(...grades: (number | null | undefined)[]) {
        if (grades.length > 0 
            && grades.every((grade: number | null | undefined): grade is number => typeof grade === 'number')) {
            return grades.reduce((total, grade) => total + grade, 0) / grades.length;
        }
        else {
            return null;
        }
    }

    private tryDecryptingEmail(dto: { email?: string | null }) {
        return wrapDecryptionError(() => {
            if (!dto.email) {
                return;
            }

            const decryptedEmail = this.cryptoService.decryptAsString(dto.email);
            if (decryptedEmail) {
                dto.email = decryptedEmail;
            }
        });
    }
}