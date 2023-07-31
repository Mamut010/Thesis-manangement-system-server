"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentDetailResponse = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../shared/dtos");
class StudentDetailResponse {
}
exports.StudentDetailResponse = StudentDetailResponse;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_1.StudentInfoDto),
    tslib_1.__metadata("design:type", dtos_1.StudentInfoDto)
], StudentDetailResponse.prototype, "studentInfo", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_1.BachelorThesisRegistrationDto),
    tslib_1.__metadata("design:type", Object)
], StudentDetailResponse.prototype, "bachelorThesisRegistration", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_1.OralDefenseRegistrationDto),
    tslib_1.__metadata("design:type", Object)
], StudentDetailResponse.prototype, "oralDefenseRegistration", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_1.BachelorThesisAssessmentDto),
    tslib_1.__metadata("design:type", Object)
], StudentDetailResponse.prototype, "bachelorThesisAssessment", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_1.OralDefenseAssessmentDto),
    tslib_1.__metadata("design:type", Object)
], StudentDetailResponse.prototype, "oralDefenseAssessment", void 0);
//# sourceMappingURL=student-info.response.js.map