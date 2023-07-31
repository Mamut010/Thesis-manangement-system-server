"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturerDetailResponse = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../shared/dtos");
class LecturerDetailResponse {
}
exports.LecturerDetailResponse = LecturerDetailResponse;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_1.LecturerInfoDto),
    tslib_1.__metadata("design:type", dtos_1.LecturerInfoDto)
], LecturerDetailResponse.prototype, "lecturerInfo", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_1.BachelorThesisRegistrationDto),
    tslib_1.__metadata("design:type", Array)
], LecturerDetailResponse.prototype, "bachelorThesisRegistrations", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_1.OralDefenseRegistrationDto),
    tslib_1.__metadata("design:type", Array)
], LecturerDetailResponse.prototype, "oralDefenseRegistrations", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_1.BachelorThesisAssessmentDto),
    tslib_1.__metadata("design:type", Array)
], LecturerDetailResponse.prototype, "bachelorThesisAssessments", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_1.OralDefenseAssessmentDto),
    tslib_1.__metadata("design:type", Array)
], LecturerDetailResponse.prototype, "oralDefenseAssessments", void 0);
//# sourceMappingURL=lecturer-info.response.js.map