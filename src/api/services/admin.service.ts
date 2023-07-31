import { inject, injectable } from "inversify";
import { 
    AdminServiceInterface, 
    AdminStudentServiceInterface,
    AdminLecturerServiceInterface,
    AdminThesisServiceInterface,
    AdminSelfServiceInterface,
} from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";

@injectable()
export class AdminService implements AdminServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.AdminSelfService) private adminSelfService: AdminSelfServiceInterface,
        @inject(INJECTION_TOKENS.AdminStudentService) private adminStudentService: AdminStudentServiceInterface,
        @inject(INJECTION_TOKENS.AdminLecturerService) private adminLecturerService: AdminLecturerServiceInterface,
        @inject(INJECTION_TOKENS.AdminThesisService) private adminThesisService: AdminThesisServiceInterface) {

    }

    async getAdminInfo(adminId: number) {
        return this.adminSelfService.getAdminInfo(adminId);
    }

    async getStudentDetail(studentId: number) {
        return this.adminStudentService.getStudentDetail(studentId);
    }

    async getStudentInfo(studentId: number) {
        return this.adminStudentService.getStudentInfo(studentId);
    }

    async getStudentBachelorThesisRegistration(studentId: number) {
        return this.adminStudentService.getStudentBachelorThesisRegistration(studentId);
    }

    async getStudentOralDefenseRegistration(studentId: number) {
        return this.adminStudentService.getStudentOralDefenseRegistration(studentId);
    }

    async getStudentBachelorThesisAssessment(studentId: number) {
        return this.adminStudentService.getStudentBachelorThesisAssessment(studentId);
    }

    async getStudentOralDefenseAssessment(studentId: number) {
        return this.adminStudentService.getStudentOralDefenseAssessment(studentId);
    }

    async getLecturerDetail(lecturerId: number) {
        return this.adminLecturerService.getLecturerDetail(lecturerId);
    }

    async getLecturerInfo(lecturerId: number) {
        return this.adminLecturerService.getLecturerInfo(lecturerId);
    }

    async getLecturerBachelorThesisRegistrations(lecturerId: number) {
        return this.adminLecturerService.getLecturerBachelorThesisRegistrations(lecturerId);
    }

    async getLecturerOralDefenseRegistrations(lecturerId: number) {
        return this.adminLecturerService.getLecturerOralDefenseRegistrations(lecturerId);
    }

    async getLecturerBachelorThesisAssessments(lecturerId: number) {
        return this.adminLecturerService.getLecturerBachelorThesisAssessments(lecturerId);
    }

    async getLecturerOralDefenseAssessments(lecturerId: number) {
        return this.adminLecturerService.getLecturerOralDefenseAssessments(lecturerId);
    }

    async getThesisInfo(thesisId: number) {
        return this.adminThesisService.getThesisInfo(thesisId);
    }
}