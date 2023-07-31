"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshContextDto = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class JwtRefreshContextDto {
}
exports.JwtRefreshContextDto = JwtRefreshContextDto;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtRefreshContextDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], JwtRefreshContextDto.prototype, "userId", void 0);
//# sourceMappingURL=jwt-refresh-context.dto.js.map