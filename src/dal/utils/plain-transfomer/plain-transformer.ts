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
    RequestGroupStakeholderDto, 
    RequestStakeholderDto, 
    RequestUserStakeholderDto, 
    RoleDto, 
    StudentAttemptDto, 
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
    PlainDetailedStudentAttempt, 
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
    PlainRequestStakeholder, 
    PlainRole, 
    PlainStudent,
    PlainStudentAttempt,
    PlainThesis,
    PlainTopic,
    PlainUser,
    ProgramOnlyGroupAndMemberIds
} from "../../types/plain-types";
import { PlainTransformerInterface } from "./plain-transformer.interface";
import { StateType } from "../../../api/others/workflow";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { CryptoServiceInterface } from "../../../shared/interfaces";
import { wrapDecryptionError } from "../../../utils/wrap";
import { RequestData } from "@prisma/client";
import { getSexFromNumericCode, sexToTitle } from "../../../utils/sex-helpers";

@injectable()
export class PlainTransformer implements PlainTransformerInterface {
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
        dto.sex = getSexFromNumericCode(plain.sex);
        dto.numberOfAttempts = plain._count.studentAttempts;
        
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

        dto.creatorId = plain.creator.userId;
        dto.creatorTitle = plain.creator.title;

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

    public toStudentAttempt(plain: PlainStudentAttempt): StudentAttemptDto {
        const dto = plainToInstanceExactMatch(StudentAttemptDto, flattenObject(plain, {
            keepDuplicate: true,
        }));
        
        dto.supervisor1Id = plain.thesis.creatorId;
        dto.bachelorThesisRegistrationId = plain.bachelorThesisRegistration?.id ?? null;
        dto.oralDefenseRegistrationId = plain.oralDefenseRegistration?.id ?? null;
        dto.bachelorThesisAssessmentId = plain.bachelorThesisAssessment?.id ?? null;
        dto.oralDefenseAssessmentId = plain.oralDefenseAssessment?.id ?? null;
        dto.bachelorThesisEvaluationId = plain.bachelorThesisEvaluation?.id ?? null;
        dto.requestId = plain.studentAttemptRequest?.requestId ?? null;

        return dto;
    }

    public toBachelorThesisRegistration(plain: PlainBachelorThesisRegistration): BachelorThesisRegistrationDto {
        let dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisRegistrationDto, plain);
    
        const studentAttempt = this.mapDetailedStudentAttempt(plain.studentAttempt);
        const programAdminGroup = this.mapProgramGroupAndMemberIds(plain.studentAttempt.student.program);
        dto = { ...dto, ...studentAttempt, ...programAdminGroup };

        return dto;
    }

    public toOralDefenseRegistration(plain: PlainOralDefenseRegistration): OralDefenseRegistrationDto {
        let dto = this.toBachelorThesisOrOralDefenseDto(OralDefenseRegistrationDto, plain);

        const studentAttempt = this.mapDetailedStudentAttempt(plain.studentAttempt);
        const programAdminGroup = this.mapProgramGroupAndMemberIds(plain.studentAttempt.student.program);
        dto = { ...dto, ...studentAttempt, ...programAdminGroup };

        return dto;
    }

    public toBachelorThesisAssessment(plain: PlainBachelorThesisAssessment): BachelorThesisAssessmentDto {
        let dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisAssessmentDto, plain);

        const studentAttempt = this.mapDetailedStudentAttempt(plain.studentAttempt);
        dto = { ...dto, ...studentAttempt };
        dto.overallGrade = this.computeOverallGrade(dto.supervisor1Grade, dto.supervisor2Grade);

        return dto;
    }

    public toOralDefenseAssessment(plain: PlainOralDefenseAssessment): OralDefenseAssessmentDto {
        let dto = this.toBachelorThesisOrOralDefenseDto(OralDefenseAssessmentDto, plain);

        const studentAttempt = this.mapDetailedStudentAttempt(plain.studentAttempt);
        dto = { ...dto, ...studentAttempt };
        dto.overallGrade = this.computeOverallGrade(dto.supervisor1Grade, dto.supervisor2Grade);

        return dto;
    }

    public toBachelorThesisEvaluation(plain: PlainBachelorThesisEvaluation): BachelorThesisEvaluationDto {
        const dto = this.toBachelorThesisOrOralDefenseDto(BachelorThesisEvaluationDto, plain);

        dto.title = sexToTitle(getSexFromNumericCode(plain.studentAttempt.student.sex));
        dto.supervisorId = plain.studentAttempt.thesis.creatorId;
        dto.supervisorTitle = plain.studentAttempt.thesis.creator.title;
        dto.supervisorSignature = plain.studentAttempt.thesis.creator.signature;

        return dto;
    }

    public toProcess(plain: PlainProcess): ProcessDto {
        const dto = plainToInstanceExactMatch(ProcessDto, plain);
        return dto;
    }

    public toRequest(plain: PlainRequest): RequestDto {
        const dto = plainToInstanceExactMatch(RequestDto, plain);

        dto.creatorId = plain.userId;
        dto.state = plain.state.name;
        dto.stateDescription = plain.state.description;
        dto.stateType = plain.state.stateType.name as StateType;

        const stakeholderIds = plain.requestStakeholders
            .reduce((result, item) => {
                if (item.groupId !== null) {
                    result.groupIds.push(item.groupId);
                }
                else if (item.userId !== null) {
                    result.userIds.push(item.userId);
                }
                return result;
            }, {
                userIds: new Array<string>(),
                groupIds: new Array<string>(),
            });
        dto.userStakeholderIds = stakeholderIds.userIds;
        dto.groupStakeholderIds = stakeholderIds.groupIds;

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

    public toRequestStakeholder(requestId: string, plains: PlainRequestStakeholder[]): RequestStakeholderDto {
        const userStakeholders: RequestUserStakeholderDto[] = [];
        const groupStakeholders: RequestGroupStakeholderDto[] = [];

        plains.forEach(item => {
            if (item.group !== null) {
                groupStakeholders.push({
                    groupId: item.group.id,
                    memberIds: item.group.users.map(user => user.userId),
                    isAccepted: item.isAccepted,
                });
            }
            else if (item.userId !== null) {
                userStakeholders.push({
                    userId: item.userId,
                    isAccepted: item.isAccepted
                });
            }
        });

        return { requestId, userStakeholders, groupStakeholders };
    }

    private toBachelorThesisOrOralDefenseDto<T extends object>(cls: new (...args: any[]) => T, plain: object): T {
        return plainToInstanceExactMatch(cls, flattenObject(plain, {
            keepDuplicate: true,
        }));
    }

    private mapDetailedStudentAttempt(plain: PlainDetailedStudentAttempt) {
        return {
            supervisor1Id: plain.thesis.creatorId,
            supervisor1Title: plain.thesis.creator.title,
            supervisor1Signature: plain.thesis.creator.signature,
            supervisor2Title: plain.supervisor2.title,
            supervisor2Signature: plain.supervisor2.signature,
            studentSignature: plain.student.signature,
        }
    }

    private mapProgramGroupAndMemberIds(plain: ProgramOnlyGroupAndMemberIds | null) {
        return {
            programAdminGroupId: plain ? plain.programAdminGroup?.group.id : null,
            programAdminGroupMemberIds: plain?.programAdminGroup?.group.users.map(item => item.userId),
        }
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

    private tryDecryptingEmail(dto: { email: string }) {
        return wrapDecryptionError(() => {
            const decryptedEmail = this.cryptoService.decryptAsString(dto.email);
            if (decryptedEmail) {
                dto.email = decryptedEmail;
            }
        });
    }
}