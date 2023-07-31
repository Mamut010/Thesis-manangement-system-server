"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshPayloadDto = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const jwt_refresh_context_dto_1 = require("./jwt-refresh-context.dto");
class JwtRefreshPayloadDto {
}
exports.JwtRefreshPayloadDto = JwtRefreshPayloadDto;
tslib_1.__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => jwt_refresh_context_dto_1.JwtRefreshContextDto),
    tslib_1.__metadata("design:type", jwt_refresh_context_dto_1.JwtRefreshContextDto)
], JwtRefreshPayloadDto.prototype, "context", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtRefreshPayloadDto.prototype, "iat", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtRefreshPayloadDto.prototype, "exp", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], JwtRefreshPayloadDto.prototype, "iss", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => String),
    tslib_1.__metadata("design:type", Array)
], JwtRefreshPayloadDto.prototype, "aud", void 0);
//# sourceMappingURL=jwt-refresh-payload.dto.js.map