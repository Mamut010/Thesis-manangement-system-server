import { injectable } from "inversify";
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
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";
import { flattenObject } from "../../../utils/object-helpers";
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
    PlainRole, 
    PlainStudent,
    PlainThesis,
    PlainTopic,
    PlainUser
} from "../../types/plain-types";
import { PlainTransformerInterface } from "./plain-transformer.interface";
import { RefreshToken } from "../../../core/models";

@injectable()
export class PlainTransformer implements PlainTransformerInterface {
    private static readonly bachelorThesisAndOralDefenseRelations 
        = ['thesis', 'supervisor', 'supervisor1', 'supervisor2'];

    public toUser(plain: PlainUser): UserDto {
        const dto = plainToInstanceExactMatch(UserDto, flattenObject(plain, {
            transformedProps: ['role']
        }));
        return dto;
    }

    public toRefreshToken(plain: RefreshToken): RefreshTokenDto {
        const dto = plainToInstanceExactMatch(RefreshTokenDto, plain);
        return dto;
    }

    public toNotification(plain: PlainNotification): NotificationDto {
        const dto = plainToInstanceExactMatch(NotificationDto, plain);
        return dto;
    }

    public toAdminInfo(plain: PlainAdmin): AdminDto {
        const dto = plainToInstanceExactMatch(AdminDto, flattenObject(plain));
        dto.adminId = plain.userId;
        return dto;
    }

    public toStudentInfo(plain: PlainStudent): StudentDto {
        const dto = plainToInstanceExactMatch(StudentDto, flattenObject(plain));
        dto.studentId = plain.userId;
        return dto;
    }

    public toLecturerInfo(plain: PlainLecturer): LecturerDto {
        const dto = plainToInstanceExactMatch(LecturerDto, flattenObject(plain, {
            transformedProps: ['role']
        }));
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
        return dto;
    }

    public toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(OralDefenseRegistrationDto, plain);
        return dto;
    }

    public toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisAssessmentDto, plain);
        dto.overallGrade = this.computeOverallGrade(dto.supervisor1Grade, dto.supervisor2Grade);
        return dto;
    }

    public toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(OralDefenseAssessmentDto, plain);
        dto.overallGrade = this.computeOverallGrade(dto.supervisor1Grade, dto.supervisor2Grade);
        return dto;
    }

    public toBachelorThesisEvaluation(plain: PlainBachelorThesisEvaluation): BachelorThesisEvaluationDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisEvaluationDto, plain);
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
}