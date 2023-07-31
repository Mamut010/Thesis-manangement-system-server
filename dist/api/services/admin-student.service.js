"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStudentService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const student_info_response_1 = require("../../contracts/responses/student-info.response");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const not_found_error_message_1 = require("../../core/constants/not-found-error-message");
const not_found_error_1 = require("../../contracts/errors/not-found.error");
let AdminStudentService = exports.AdminStudentService = class AdminStudentService {
    constructor(prisma, plainTransformer) {
        this.prisma = prisma;
        this.plainTransformer = plainTransformer;
    }
    async getStudentDetail(studentId) {
        const response = new student_info_response_1.StudentDetailResponse();
        response.studentInfo = await this.getStudentInfo(studentId);
        response.bachelorThesisRegistration = await this.getStudentBachelorThesisRegistration(studentId);
        response.oralDefenseRegistration = await this.getStudentOralDefenseRegistration(studentId);
        response.bachelorThesisAssessment = await this.getStudentBachelorThesisAssessment(studentId);
        response.oralDefenseAssessment = await this.getStudentOralDefenseAssessment(studentId);
        return response;
    }
    async getStudentInfo(studentId) {
        const student = await this.prisma.student.findUnique({
            where: {
                userId: studentId
            },
            include: {
                user: true,
            }
        });
        if (!student) {
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.StudentNotFound);
        }
        return this.plainTransformer.toStudentInfo(student);
    }
    async getStudentBachelorThesisRegistration(studentId) {
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
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.BachelorThesisRegistrationNotFound);
        }
        return this.plainTransformer.toBachelorThesisRegistration(bachelorThesisRegistration);
    }
    async getStudentOralDefenseRegistration(studentId) {
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
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.OralDefenseRegistrationNotFound);
        }
        return this.plainTransformer.toOralDefenseRegistration(oralDefenseRegistration);
    }
    async getStudentBachelorThesisAssessment(studentId) {
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
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.BachelorThesisAssessmentNotFound);
        }
        return this.plainTransformer.toBachelorThesisAssessment(bachelorThesisAssessment);
    }
    async getStudentOralDefenseAssessment(studentId) {
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
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.OralDefenseAssessmentNotFound);
        }
        return this.plainTransformer.toOralDefenseAssessment(oralDefenseAssessment);
    }
};
exports.AdminStudentService = AdminStudentService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__param(1, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.PlainTransformer)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient, Object])
], AdminStudentService);
//# sourceMappingURL=admin-student.service.js.map