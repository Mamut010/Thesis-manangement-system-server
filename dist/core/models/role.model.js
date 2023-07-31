"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const roles_1 = require("../enums/roles");
const class_transformer_1 = require("class-transformer");
class Role {
}
exports.Role = Role;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(roles_1.Roles)),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
//# sourceMappingURL=role.model.js.map