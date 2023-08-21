import { inject, injectable } from "inversify";
import { AdminStudentServiceInterface } from "../interfaces";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
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
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { bachelorThesisAndOralDefenseInclude } from "../../dal/constants/includes";
import { StudentRepoInterface } from "../../dal/interfaces";
import { StudentUpdateRequest } from "../../contracts/requests/student-update.request";

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.StudentRepo) private studentRepo: StudentRepoInterface) {

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
        response.bachelorThesisRegistration = await this.getStudentBachelorThesisRegistration(studentId);
        response.oralDefenseRegistration = await this.getStudentOralDefenseRegistration(studentId);
        response.bachelorThesisAssessment = await this.getStudentBachelorThesisAssessment(studentId);
        response.oralDefenseAssessment = await this.getStudentOralDefenseAssessment(studentId);

        return response;
    }

    async getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationDto> {
        const bachelorThesisRegistration = await this.prisma.bachelorThesisRegistration.findUnique({
            where: {
                studentId: studentId
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        if (!bachelorThesisRegistration) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }

        return this.plainTransformer.toBachelorThesisRegistration(bachelorThesisRegistration);
    }

    async getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationDto> {
        const oralDefenseRegistration = await this.prisma.oralDefenseRegistration.findUnique({
            where: {
                studentId: studentId
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        if (!oralDefenseRegistration) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }

        return this.plainTransformer.toOralDefenseRegistration(oralDefenseRegistration);
    }

    async getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentDto> {
        const bachelorThesisAssessment = await this.prisma.bachelorThesisAssessment.findUnique({
            where: {
                studentId: studentId
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        if (!bachelorThesisAssessment) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }

        return this.plainTransformer.toBachelorThesisAssessment(bachelorThesisAssessment);
    }

    async getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentDto> {
        const oralDefenseAssessment = await this.prisma.oralDefenseAssessment.findUnique({
            where: {
                studentId: studentId
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        if (!oralDefenseAssessment) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseAssessmentNotFound);
        }

        return this.plainTransformer.toOralDefenseAssessment(oralDefenseAssessment);
    }

    async updateStudent(studentId: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto> {
        const result = await this.studentRepo.update(studentId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return result;
    }
}