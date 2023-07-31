"use strict";
var PlainTransformerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainTransformerService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dtos_1 = require("../../shared/dtos");
const class_transformer_helpers_1 = require("../../utils/class-transformer-helpers");
const object_helpers_1 = require("../../utils/object-helpers");
const name_helpers_1 = require("../../utils/name-helpers");
let PlainTransformerService = exports.PlainTransformerService = PlainTransformerService_1 = class PlainTransformerService {
    toAdminInfo(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.AdminInfoDto, (0, object_helpers_1.flattenObject)(plain));
        dto.adminId = plain.userId;
        return dto;
    }
    toStudentInfo(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.StudentInfoDto, (0, object_helpers_1.flattenObject)(plain));
        dto.studentId = plain.userId;
        dto.fullname = (0, name_helpers_1.getFullName)(plain.user.forename, plain.user.surname);
        return dto;
    }
    toLecturerInfo(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.LecturerInfoDto, (0, object_helpers_1.flattenObject)(plain));
        dto.lecturerId = plain.userId;
        return dto;
    }
    toThesisInfo(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.ThesisInfoDto, (0, object_helpers_1.flattenObject)(plain, {
            transformedProps: ['topic', 'field'],
        }));
        return dto;
    }
    toBachelorThesisRegistration(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.BachelorThesisRegistrationDto, (0, object_helpers_1.flattenObject)(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformerService_1.registrationAndAssessmentRelations,
        }));
        dto.thesisType = plain.thesis.field?.description ?? null;
        return dto;
    }
    toOralDefenseRegistration(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.OralDefenseRegistrationDto, (0, object_helpers_1.flattenObject)(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformerService_1.registrationAndAssessmentRelations,
        }));
        dto.areSpectatorsAllowed = (plain.spectatorsPresent ?? 0) > 1;
        return dto;
    }
    toBachelorThesisAssessment(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.BachelorThesisAssessmentDto, (0, object_helpers_1.flattenObject)(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformerService_1.registrationAndAssessmentRelations,
        }));
        dto.thesisType = plain.thesis.field?.description ?? null;
        return dto;
    }
    toOralDefenseAssessment(plain) {
        const dto = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.OralDefenseAssessmentDto, (0, object_helpers_1.flattenObject)(plain, {
            keepDuplicate: true,
            transformedProps: PlainTransformerService_1.registrationAndAssessmentRelations,
        }));
        return dto;
    }
};
PlainTransformerService.registrationAndAssessmentRelations = ['thesis', 'supervisor1', 'supervisor2'];
exports.PlainTransformerService = PlainTransformerService = PlainTransformerService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PlainTransformerService);
//# sourceMappingURL=plain-transformer.service.js.map