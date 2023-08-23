import { inject, injectable } from "inversify";
import { AdminStudentServiceInterface } from "../interfaces";
import { StudentDetailResponse } from "../../contracts/responses/api/student-info.response";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto
} from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { StudentsQueryRequest } from "../../contracts/requests/api/students-query.request";
import { StudentsQueryResponse } from "../../contracts/responses/api/students-query.response";
import { 
    BachelorThesisAssessmentRepoInterface, 
    BachelorThesisEvaluationRepoInterface, 
    BachelorThesisRegistrationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface, 
    StudentRepoInterface 
} from "../../dal/interfaces";
import { StudentUpdateRequest } from "../../contracts/requests/api/student-update.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { StringFilter } from "../../lib/query";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";
import { ClassConstructor } from "../../utils/types";
import { BachelorThesisEvaluationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { singleOrDefault } from "../../utils/array-helpers";

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) private studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationRepo) private bteRepo: BachelorThesisEvaluationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface) {

    }

    async getStudents(studentsQuery: StudentsQueryRequest): Promise<StudentsQueryResponse> {
        return await this.studentRepo.query(studentsQuery);
    }

    async getStudentInfo(studentId: string): Promise<StudentInfoDto> {
        const result = await this.studentRepo.findOneById(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return result;
    }

    async getStudentDetail(studentId: string): Promise<StudentDetailResponse> {
        const response = new StudentDetailResponse();
        response.studentInfo = await this.getStudentInfo(studentId);

        const studentBtr = await this.queryStudentBachelorThesisRegistration(studentId);
        const studentBta = await this.queryStudentBachelorThesisAssessment(studentId);
        const studentBte = await this.queryStudentBachelorThesisEvaluation(studentId);
        const studentOdr = await this.queryStudentOralDefenseRegistration(studentId);
        const studentOda = await this.queryStudentOralDefenseAssessment(studentId);

        response.bachelorThesisRegistration = singleOrDefault(studentBtr, null);
        response.bachelorThesisAssessment = singleOrDefault(studentBta, null);
        response.bachelorThesisEvaluation = singleOrDefault(studentBte, null);
        response.oralDefenseRegistration = singleOrDefault(studentOdr, null);
        response.oralDefenseAssessment = singleOrDefault(studentOda, null);

        return response;
    }

    async getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationDto> {
        const result = await this.queryStudentBachelorThesisRegistration(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }

        return result[0];
    }

    async getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentDto> {
        const result = await this.queryStudentBachelorThesisAssessment(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }

        return result[0];
    }

    async getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationDto> {
        const result = await this.queryStudentBachelorThesisEvaluation(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisEvaluationNotFound);
        }

        return result[0];
    }

    async getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationDto> {
        const result = await this.queryStudentOralDefenseRegistration(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }

        return result[0];
    }

    async getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentDto> {
        const result = await this.queryStudentOralDefenseAssessment(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseAssessmentNotFound);
        }

        return result[0];
    }

    async updateStudent(studentId: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto> {
        const result = await this.studentRepo.update(studentId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return result;
    }

    private async queryStudentBachelorThesisRegistration(studentId: string) {
        const queryRequest = this.createQueryRequest(BachelorThesisRegistrationsQueryRequest, studentId);
        const queryResponse = await this.btrRepo.query(queryRequest);
        return queryResponse.content;
    }

    private async queryStudentBachelorThesisAssessment(studentId: string) {
        const queryRequest = this.createQueryRequest(BachelorThesisAssessmentsQueryRequest, studentId);
        const queryResponse = await this.btaRepo.query(queryRequest);
        return queryResponse.content;
    }

    private async queryStudentBachelorThesisEvaluation(studentId: string) {
        const queryRequest = this.createQueryRequest(BachelorThesisEvaluationsQueryRequest, studentId);
        const queryResponse = await this.bteRepo.query(queryRequest);
        return queryResponse.content;
    }

    private async queryStudentOralDefenseRegistration(studentId: string) {
        const queryRequest = this.createQueryRequest(OralDefenseRegistrationsQueryRequest, studentId);
        const queryResponse = await this.odrRepo.query(queryRequest);
        return queryResponse.content;
    }

    private async queryStudentOralDefenseAssessment(studentId: string) {
        const queryRequest = this.createQueryRequest(OralDefenseAssessmentsQueryRequest, studentId);
        const queryResponse = await this.odaRepo.query(queryRequest);
        return queryResponse.content;
    }

    private createQueryRequest<T extends object>(cls: ClassConstructor<T>, studentId: string): T {
        const studentIdFilter = new StringFilter();
        studentIdFilter.value = studentId;
        studentIdFilter.operator = 'equals';

        const queryRequest = new cls();
        return Object.assign(queryRequest, { studentIdFilter: [studentIdFilter] });
    }
}