import { inject, injectable } from "inversify";
import { AdminStudentServiceInterface } from "../interfaces";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto
} from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { StudentsQueryRequest } from "../../contracts/requests/students-query.request";
import { StudentsQueryResponse } from "../../contracts/responses/students-query.response";
import { 
    BachelorThesisAssessmentRepoInterface, 
    BachelorThesisRegistrationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface, 
    StudentRepoInterface 
} from "../../dal/interfaces";
import { StudentUpdateRequest } from "../../contracts/requests/student-update.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { StringFilter } from "../../lib/query";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";
import { ClassConstructor } from "../../utils/types";

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) private studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
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
        const studentOdr = await this.queryStudentOralDefenseRegistration(studentId);
        const studentOda = await this.queryStudentOralDefenseAssessment(studentId);

        response.bachelorThesisRegistration = studentBtr.length > 0 ? studentBtr[0] : null;
        response.bachelorThesisAssessment = studentBta.length > 0 ? studentBta[0] : null;
        response.oralDefenseRegistration = studentOdr.length > 0 ? studentOdr[0] : null;
        response.oralDefenseAssessment = studentOda.length > 0 ? studentOda[0] : null;

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