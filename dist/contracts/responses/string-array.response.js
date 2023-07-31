"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayResponse = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class StringArrayResponse {
    constructor(content) {
        this.content = content;
    }
}
exports.StringArrayResponse = StringArrayResponse;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], StringArrayResponse.prototype, "content", void 0);
//# sourceMappingURL=string-array.response.js.map