"use strict";
var AuthHeaderJwtExtractor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeaderJwtExtractor = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const string_helpers_1 = require("../../../utils/string-helpers");
let AuthHeaderJwtExtractor = exports.AuthHeaderJwtExtractor = AuthHeaderJwtExtractor_1 = class AuthHeaderJwtExtractor {
    extract(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }
        const headerParts = authHeader.split(AuthHeaderJwtExtractor_1.TOKEN_DELIMITER);
        if (headerParts.length !== 2 || !(0, string_helpers_1.stringEqualsIgnoreCase)(headerParts[0], AuthHeaderJwtExtractor_1.TOKEN_PREFIX)) {
            return undefined;
        }
        return headerParts[1];
    }
};
AuthHeaderJwtExtractor.TOKEN_PREFIX = 'Bearer';
AuthHeaderJwtExtractor.TOKEN_DELIMITER = ' ';
exports.AuthHeaderJwtExtractor = AuthHeaderJwtExtractor = AuthHeaderJwtExtractor_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], AuthHeaderJwtExtractor);
//# sourceMappingURL=auth-header-jwt-extractor.js.map