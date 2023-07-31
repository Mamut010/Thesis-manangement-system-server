"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_FOUND_ERROR_MESSAGES = void 0;
const object_helpers_1 = require("../../utils/object-helpers");
const NOT_FOUND_ERROR_MESSAGES = {
    RoleNotFound: 'Role not found',
    AdminNotFound: 'Admin not found',
    StudentNotFound: 'Student not found',
    LecturerNotFound: 'Lecturer not found',
    ThesisNotFound: 'Thesis not found',
    BachelorThesisRegistrationNotFound: 'Bachelor thesis registration not found',
    OralDefenseRegistrationNotFound: 'Oral defense registration not found',
    BachelorThesisAssessmentNotFound: 'Bachelor thesis assessment not found',
    OralDefenseAssessmentNotFound: 'Oral defense assessment not found',
};
exports.NOT_FOUND_ERROR_MESSAGES = NOT_FOUND_ERROR_MESSAGES;
(0, object_helpers_1.makeImmutable)(NOT_FOUND_ERROR_MESSAGES);
//# sourceMappingURL=not-found-error-message.js.map