"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatingRequestDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const models_1 = require("../../core/models");
const class_transformer_1 = require("class-transformer");
class UserCreatingRequestDto {
}
exports.UserCreatingRequestDto = UserCreatingRequestDto;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UserCreatingRequestDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserCreatingRequestDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserCreatingRequestDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => models_1.Role),
    tslib_1.__metadata("design:type", models_1.Role)
], UserCreatingRequestDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UserCreatingRequestDto.prototype, "email", void 0);
//# sourceMappingURL=user-creating-request.dto.js.map