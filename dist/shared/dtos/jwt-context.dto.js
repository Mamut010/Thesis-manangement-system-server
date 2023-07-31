"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessContextDto = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const roles_1 = require("../../core/enums/roles");
class JwtAccessContextDto {
}
exports.JwtAccessContextDto = JwtAccessContextDto;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtAccessContextDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtAccessContextDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], JwtAccessContextDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], JwtAccessContextDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(1),
    (0, class_validator_1.IsIn)(Object.values(roles_1.Roles), { each: true }),
    (0, class_transformer_1.Type)(() => String),
    tslib_1.__metadata("design:type", Array)
], JwtAccessContextDto.prototype, "roles", void 0);
//# sourceMappingURL=jwt-context.dto.js.map