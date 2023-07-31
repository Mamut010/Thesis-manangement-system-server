"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const roles_1 = require("../../core/enums/roles");
const http_codes_1 = require("../../core/enums/http-codes");
const student_info_response_1 = require("../../contracts/responses/student-info.response");
const dtos_1 = require("../../shared/dtos");
const lecturer_info_response_1 = require("../../contracts/responses/lecturer-info.response");
const models_1 = require("../../core/models");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAdminInfo(user) {
        return this.adminService.getAdminInfo(user.userId);
    }
    getStudentDetail(id) {
        return this.adminService.getStudentDetail(id);
    }
    getStudentInfo(id) {
        return this.adminService.getStudentInfo(id);
    }
    getStudentBachelorThesisRegistration(id) {
        return this.adminService.getStudentBachelorThesisRegistration(id);
    }
    getStudentOralDefenseRegistration(id) {
        return this.adminService.getStudentOralDefenseRegistration(id);
    }
    getStudentBachelorThesisAssessment(id) {
        return this.adminService.getStudentBachelorThesisAssessment(id);
    }
    getStudentOralDefenseAssessment(id) {
        return this.adminService.getStudentOralDefenseAssessment(id);
    }
    getLecturerDetail(id) {
        return this.adminService.getLecturerDetail(id);
    }
    getLecturerInfo(id) {
        return this.adminService.getLecturerInfo(id);
    }
    getLecturerBachelorThesisRegistrations(id) {
        return this.adminService.getLecturerBachelorThesisRegistrations(id);
    }
    getLecturerOralDefenseRegistrations(id) {
        return this.adminService.getLecturerOralDefenseRegistrations(id);
    }
    getLecturerBachelorThesisAssessments(id) {
        return this.adminService.getLecturerBachelorThesisAssessments(id);
    }
    getLecturerOralDefenseAssessments(id) {
        return this.adminService.getLecturerOralDefenseAssessments(id);
    }
    getThesisInfo(id) {
        return this.adminService.getThesisInfo(id);
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/admins/my-info'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.AdminInfoDto),
    tslib_1.__param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getAdminInfo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/students/:id'),
    (0, routing_controllers_openapi_1.ResponseSchema)(student_info_response_1.StudentDetailResponse),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/students/:id/student-info'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.StudentInfoDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentInfo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/students/:id/bachelor-thesis-registration'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.BachelorThesisRegistrationDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentBachelorThesisRegistration", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/students/:id/oral-defense-registration'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.OralDefenseRegistrationDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentOralDefenseRegistration", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/students/:id/bachelor-thesis-assessment'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.BachelorThesisAssessmentDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentBachelorThesisAssessment", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/students/:id/oral-defense-assessment'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.OralDefenseAssessmentDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getStudentOralDefenseAssessment", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/lecturers/:id'),
    (0, routing_controllers_openapi_1.ResponseSchema)(lecturer_info_response_1.LecturerDetailResponse),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getLecturerDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/lecturers/:id/lecturer-info'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.StudentInfoDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getLecturerInfo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/lecturers/:id/bachelor-thesis-registrations'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.BachelorThesisRegistrationDto, { isArray: true }),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getLecturerBachelorThesisRegistrations", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/lecturers/:id/oral-defense-registrations'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.OralDefenseRegistrationDto, { isArray: true }),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getLecturerOralDefenseRegistrations", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/lecturers/:id/bachelor-thesis-assessments'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.BachelorThesisAssessmentDto, { isArray: true }),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getLecturerBachelorThesisAssessments", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/lecturers/:id/oral-defense-assessments'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.OralDefenseAssessmentDto, { isArray: true }),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getLecturerOralDefenseAssessments", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('/theses/:id/thesis-info'),
    (0, routing_controllers_openapi_1.ResponseSchema)(dtos_1.ThesisInfoDto),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "getThesisInfo", null);
exports.AdminController = AdminController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('admin'),
    (0, routing_controllers_1.Authorized)(roles_1.Roles.Admin),
    (0, inversify_1.injectable)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
        security: [{ bearerAuth: [] }]
    }),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.AdminService)),
    tslib_1.__metadata("design:paramtypes", [Object])
], AdminController);
//# sourceMappingURL=admin.controller.js.map