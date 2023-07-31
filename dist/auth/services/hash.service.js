"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const auth_settings_1 = require("../../core/constants/auth-settings");
let HashService = exports.HashService = class HashService {
    async hash(data) {
        const salt = await bcrypt.genSalt(auth_settings_1.AUTH_SETTINGS.Hash.SaltRounds);
        return await bcrypt.hash(data, salt);
    }
    verifyHash(data, hashedData) {
        return bcrypt.compare(data, hashedData);
    }
};
exports.HashService = HashService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HashService);
//# sourceMappingURL=hash.service.js.map