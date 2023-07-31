"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const not_found_error_1 = require("../../contracts/errors/not-found.error");
const not_found_error_message_1 = require("../../core/constants/not-found-error-message");
let AdminService = exports.AdminService = class AdminService {
    constructor(prisma, plainTransformer, adminStudentService, adminLecturerService, adminThesisService) {
        this.prisma = prisma;
        this.plainTransformer = plainTransformer;
        this.adminStudentService = adminStudentService;
        this.adminLecturerService = adminLecturerService;
        this.adminThesisService = adminThesisService;
    }
    async getAdminInfo(adminId) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                userId: adminId
            },
            include: {
                user: true,
            }
        });
        if (!admin) {
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.AdminNotFound);
        }
        return this.plainTransformer.toAdminInfo(admin);
    }
    async getStudentDetail(studentId) {
        return this.adminStudentService.getStudentDetail(studentId);
    }
    async getStudentInfo(studentId) {
        return this.adminStudentService.getStudentInfo(studentId);
    }
    async getStudentBachelorThesisRegistration(studentId) {
        return this.adminStudentService.getStudentBachelorThesisRegistration(studentId);
    }
    async getStudentOralDefenseRegistration(studentId) {
        return this.adminStudentService.getStudentOralDefenseRegistration(studentId);
    }
    async getStudentBachelorThesisAssessment(studentId) {
        return this.adminStudentService.getStudentBachelorThesisAssessment(studentId);
    }
    async getStudentOralDefenseAssessment(studentId) {
        return this.adminStudentService.getStudentOralDefenseAssessment(studentId);
    }
    async getLecturerDetail(lecturerId) {
        return this.adminLecturerService.getLecturerDetail(lecturerId);
    }
    async getLecturerInfo(lecturerId) {
        return this.adminLecturerService.getLecturerInfo(lecturerId);
    }
    async getLecturerBachelorThesisRegistrations(lecturerId) {
        return this.adminLecturerService.getLecturerBachelorThesisRegistrations(lecturerId);
    }
    async getLecturerOralDefenseRegistrations(lecturerId) {
        return this.adminLecturerService.getLecturerOralDefenseRegistrations(lecturerId);
    }
    async getLecturerBachelorThesisAssessments(lecturerId) {
        return this.adminLecturerService.getLecturerBachelorThesisAssessments(lecturerId);
    }
    async getLecturerOralDefenseAssessments(lecturerId) {
        return this.adminLecturerService.getLecturerOralDefenseAssessments(lecturerId);
    }
    async getThesisInfo(thesisId) {
        return this.adminThesisService.getThesisInfo(thesisId);
    }
};
exports.AdminService = AdminService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__param(1, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.PlainTransformer)),
    tslib_1.__param(2, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.AdminStudentService)),
    tslib_1.__param(3, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.AdminLecturerService)),
    tslib_1.__param(4, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.AdminThesisService)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient, Object, Object, Object, Object])
], AdminService);
//# sourceMappingURL=admin.service.js.map