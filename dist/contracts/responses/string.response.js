"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringResponse = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class StringResponse {
    constructor(content) {
        this.content = content;
    }
}
exports.StringResponse = StringResponse;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StringResponse.prototype, "content", void 0);
//# sourceMappingURL=string.response.js.map