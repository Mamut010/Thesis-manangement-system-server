import { inject, injectable } from "inversify";
import { 
    AdminStudentServiceInterface, 
    PlainTransformerServiceInterface 
} from "../interfaces";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
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

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getStudents(studentsQuery: StudentsQueryRequest): Promise<StudentsQueryResponse> {
        const model = {
            ...this.queryCreator.createQueryModel(Student),
            user: this.queryCreator.createQueryModel(User),
        };
        const prismaQuery = this.queryCreator.createQueryObject(model, studentsQuery, { fieldMap: { studentId: 'userId' } });
        
        const count = await this.prisma.student.count({ ...prismaQuery, skip: undefined, take: undefined });
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

    async getStudentDetail(studentId: number): Promise<StudentDetailResponse> {
        const response = new StudentDetailResponse();
        response.studentInfo = await this.getStudentInfo(studentId);
        response.bachelorThesisRegistration = await this.getStudentBachelorThesisRegistration(studentId);
        response.oralDefenseRegistration = await this.getStudentOralDefenseRegistration(studentId);
        response.bachelorThesisAssessment = await this.getStudentBachelorThesisAssessment(studentId);
        response.oralDefenseAssessment = await this.getStudentOralDefenseAssessment(studentId);

        return response;
    }

    async getStudentInfo(studentId: number): Promise<StudentInfoDto> {
        const student = await this.prisma.student.findUnique({
            where: {
                userId: studentId
            },
            include: {
                user: true,
            }
        });

        if (!student) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.StudentNotFound);
        }

        return this.plainTransformer.toStudentInfo(student);
    }

    async getStudentBachelorThesisRegistration(studentId: number): Promise<BachelorThesisRegistrationDto> {
        const bachelorThesisRegistration = await this.prisma.bachelorThesisRegistration.findUnique({
            where: {
                studentId: studentId
            },
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                thesis: {
                    include: {
                        field: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
        });

        if (!bachelorThesisRegistration) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.BachelorThesisRegistrationNotFound);
        }

        return this.plainTransformer.toBachelorThesisRegistration(bachelorThesisRegistration);
    }

    async getStudentOralDefenseRegistration(studentId: number): Promise<OralDefenseRegistrationDto> {
        const oralDefenseRegistration = await this.prisma.oralDefenseRegistration.findUnique({
            where: {
                studentId: studentId
            },
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
        });

        if (!oralDefenseRegistration) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.OralDefenseRegistrationNotFound);
        }

        return this.plainTransformer.toOralDefenseRegistration(oralDefenseRegistration);
    }

    async getStudentBachelorThesisAssessment(studentId: number): Promise<BachelorThesisAssessmentDto> {
        const bachelorThesisAssessment = await this.prisma.bachelorThesisAssessment.findUnique({
            where: {
                studentId: studentId
            },
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                thesis: {
                    include: {
                        field: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
        });

        if (!bachelorThesisAssessment) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.BachelorThesisAssessmentNotFound);
        }

        return this.plainTransformer.toBachelorThesisAssessment(bachelorThesisAssessment);
    }

    async getStudentOralDefenseAssessment(studentId: number): Promise<OralDefenseAssessmentDto> {
        const oralDefenseAssessment = await this.prisma.oralDefenseAssessment.findUnique({
            where: {
                studentId: studentId
            },
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
        });

        if (!oralDefenseAssessment) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.OralDefenseAssessmentNotFound);
        }

        return this.plainTransformer.toOralDefenseAssessment(oralDefenseAssessment);
    }
}