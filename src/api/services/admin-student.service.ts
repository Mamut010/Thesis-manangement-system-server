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
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { StudentsQueryResponse } from "../../contracts/responses/students-query.response";
import { Student, User } from "../../core/models";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { bachelorThesisAndOralDefenseInclude } from "../../dal/constants/includes";

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getStudents(studentsQuery: StudentsQueryRequest): Promise<StudentsQueryResponse> {
        const model = {
            ...this.queryCreator.createQueryModel(Student),
            user: this.queryCreator.createQueryModel(User),
        };
        const prismaQuery = this.queryCreator.createQueryObject(model, studentsQuery, { fieldNameMap: { studentId: 'userId' } });
        
        const count = await this.prisma.student.count({ where: prismaQuery.where });
        const students = await this.prisma.student.findMany({ 
            ...prismaQuery,
            include: {
                user: true
            }
        });

        const response = new StudentsQueryResponse();
        response.content = students.map(item => this.plainTransformer.toStudentInfo(item));
        response.count = count;
        return response;
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

    async getStudentInfo(studentId: string): Promise<StudentInfoDto> {
        const student = await this.prisma.student.findUnique({
            where: {
                userId: studentId
            },
            include: {
                user: true,
            }
        });

        if (!student) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return this.plainTransformer.toStudentInfo(student);
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
}