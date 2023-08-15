import { injectable } from "inversify";
import { 
    AdminInfoDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    FieldDto, 
    LecturerInfoDto, 
    LocationDto, 
    NotificationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    RoleDto, 
    StudentInfoDto,
    ThesisDto,
    TopicDto
} from "../../dtos";
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
    PlainOralDefenseAssessment, 
    PlainOralDefenseRegistration, 
    PlainRole, 
    PlainStudent,
    PlainThesis,
    PlainTopic
} from "../../types/plain-types";
import { PlainTransformerInterface } from "./plain-transformer.interface";
import { Notification } from "../../../core/models";

@injectable()
export class PlainTransformer implements PlainTransformerInterface {
    private static readonly bachelorThesisAndOralDefenseRelations 
        = ['thesis', 'supervisor', 'supervisor1', 'supervisor2'];

    public toNotification(plain: Notification): NotificationDto {
        const dto = plainToInstanceExactMatch(NotificationDto, plain);
        return dto;
    }

    public toAdminInfo(plain: PlainAdmin): AdminInfoDto {
        const dto = plainToInstanceExactMatch(AdminInfoDto, flattenObject(plain));
        dto.adminId = plain.userId;

        return dto;
    }

    public toStudentInfo(plain: PlainStudent): StudentInfoDto {
        const dto = plainToInstanceExactMatch(StudentInfoDto, flattenObject(plain));
        dto.studentId = plain.userId;
        
        return dto;
    }

    public toLecturerInfo(plain: PlainLecturer): LecturerInfoDto {
        const dto = plainToInstanceExactMatch(LecturerInfoDto, flattenObject(plain, {
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
        const dto = plainToInstanceExactMatch(BachelorThesisRegistrationDto, flattenObject(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformer.bachelorThesisAndOralDefenseRelations,
        }));
        
        return dto;
    }

    public toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto {
        const dto = plainToInstanceExactMatch(OralDefenseRegistrationDto, flattenObject(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformer.bachelorThesisAndOralDefenseRelations,
        }));
        
        return dto;
    }

    public toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto {
        const dto = plainToInstanceExactMatch(BachelorThesisAssessmentDto, flattenObject(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformer.bachelorThesisAndOralDefenseRelations,
        }));
        
        return dto;
    }

    public toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto {
        const dto = plainToInstanceExactMatch(OralDefenseAssessmentDto, flattenObject(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformer.bachelorThesisAndOralDefenseRelations,
        }));

        return dto;
    }

    public toBachelorThesisEvaluation(plain: PlainBachelorThesisEvaluation): BachelorThesisEvaluationDto {
        const dto = plainToInstanceExactMatch(BachelorThesisEvaluationDto, flattenObject(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformer.bachelorThesisAndOralDefenseRelations,
        }));

        return dto;
    }
}