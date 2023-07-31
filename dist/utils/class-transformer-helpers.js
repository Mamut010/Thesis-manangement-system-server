"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceArrayToPlainSkipUnset = exports.instanceToPlainSkipUnset = exports.plainArrayToInstanceExactMatch = exports.plainToInstanceExactMatch = void 0;
const class_transformer_1 = require("class-transformer");
function plainToInstanceExactMatch(cls, plain) {
    return (0, class_transformer_1.plainToInstance)(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false });
}
exports.plainToInstanceExactMatch = plainToInstanceExactMatch;
function plainArrayToInstanceExactMatch(cls, plain) {
    return (0, class_transformer_1.plainToInstance)(cls, plain, { excludeExtraneousValues: true, exposeUnsetFields: false });
}
exports.plainArrayToInstanceExactMatch = plainArrayToInstanceExactMatch;
function instanceToPlainSkipUnset(object) {
    return (0, class_transformer_1.instanceToPlain)(object, { exposeUnsetFields: false });
}
exports.instanceToPlainSkipUnset = instanceToPlainSkipUnset;
function instanceArrayToPlainSkipUnset(object) {
    return (0, class_transformer_1.instanceToPlain)(object, { exposeUnsetFields: false });
}
exports.instanceArrayToPlainSkipUnset = instanceArrayToPlainSkipUnset;
//# sourceMappingURL=class-transformer-helpers.js.map