"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessPayloadDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const jwt_context_dto_1 = require("./jwt-context.dto");
const class_transformer_1 = require("class-transformer");
class JwtAccessPayloadDto {
}
exports.JwtAccessPayloadDto = JwtAccessPayloadDto;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => jwt_context_dto_1.JwtAccessContextDto),
    tslib_1.__metadata("design:type", jwt_context_dto_1.JwtAccessContextDto)
], JwtAccessPayloadDto.prototype, "context", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtAccessPayloadDto.prototype, "iat", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtAccessPayloadDto.prototype, "exp", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], JwtAccessPayloadDto.prototype, "iss", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => String),
    tslib_1.__metadata("design:type", Array)
], JwtAccessPayloadDto.prototype, "aud", void 0);
//# sourceMappingURL=jwt-payload.dto.js.map