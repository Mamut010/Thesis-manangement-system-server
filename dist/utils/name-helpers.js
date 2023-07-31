"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullName = void 0;
function getFullName(forename, surname) {
    if (!forename) {
        return surname;
    }
    else {
        return forename + (surname ? ' ' + surname : '');
    }
}
exports.getFullName = getFullName;
//# sourceMappingURL=name-helpers.js.map