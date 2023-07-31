"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLecturerService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const not_found_error_message_1 = require("../../core/constants/not-found-error-message");
const not_found_error_1 = require("../../contracts/errors/not-found.error");
const lecturer_info_response_1 = require("../../contracts/responses/lecturer-info.response");
let AdminLecturerService = exports.AdminLecturerService = class AdminLecturerService {
    constructor(prisma, plainTransformer) {
        this.prisma = prisma;
        this.plainTransformer = plainTransformer;
    }
    async getLecturerDetail(lecturerId) {
        const response = new lecturer_info_response_1.LecturerDetailResponse();
        response.lecturerInfo = await this.getLecturerInfo(lecturerId);
        response.bachelorThesisRegistrations = await this.getLecturerBachelorThesisRegistrations(lecturerId);
        response.oralDefenseRegistrations = await this.getLecturerOralDefenseRegistrations(lecturerId);
        response.bachelorThesisAssessments = await this.getLecturerBachelorThesisAssessments(lecturerId);
        response.oralDefenseAssessments = await this.getLecturerOralDefenseAssessments(lecturerId);
        return response;
    }
    async getLecturerInfo(lecturerId) {
        const lecturer = await this.prisma.lecturer.findUnique({
            where: {
                userId: lecturerId
            },
            include: {
                user: true,
            }
        });
        if (!lecturer) {
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.LecturerNotFound);
        }
        return this.plainTransformer.toLecturerInfo(lecturer);
    }
    async getLecturerBachelorThesisRegistrations(lecturerId) {
        const bachelorThesisRegistrations = await this.prisma.bachelorThesisRegistration.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
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
        return bachelorThesisRegistrations.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
    }
    async getLecturerOralDefenseRegistrations(lecturerId) {
        const oralDefenseRegistrations = await this.prisma.oralDefenseRegistration.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
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
        return oralDefenseRegistrations.map(item => this.plainTransformer.toOralDefenseRegistration(item));
    }
    async getLecturerBachelorThesisAssessments(lecturerId) {
        const bachelorThesisAssessments = await this.prisma.bachelorThesisAssessment.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
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
        return bachelorThesisAssessments.map(item => this.plainTransformer.toBachelorThesisAssessment(item));
    }
    async getLecturerOralDefenseAssessments(lecturerId) {
        const oralDefenseAssessments = await this.prisma.oralDefenseAssessment.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
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
        return oralDefenseAssessments.map(item => this.plainTransformer.toOralDefenseAssessment(item));
    }
};
exports.AdminLecturerService = AdminLecturerService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__param(1, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.PlainTransformer)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient, Object])
], AdminLecturerService);
//# sourceMappingURL=admin-lecturer.service.js.map