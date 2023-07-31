import { inject, injectable } from "inversify";
import { 
    AdminServiceInterface, 
    AdminStudentServiceInterface,
    AdminLecturerServiceInterface,
    PlainTransformerServiceInterface,
    AdminThesisServiceInterface,
} from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";

@injectable()
export class AdminService implements AdminServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface,
        @inject(INJECTION_TOKENS.AdminStudentService) private adminStudentService: AdminStudentServiceInterface,
        @inject(INJECTION_TOKENS.AdminLecturerService) private adminLecturerService: AdminLecturerServiceInterface,
        @inject(INJECTION_TOKENS.AdminThesisService) private adminThesisService: AdminThesisServiceInterface) {

    }

    async getAdminInfo(adminId: number) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                userId: adminId
            },
            include: {
                user: true,
            }
        });

        if (!admin) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.AdminNotFound);
        }

        return this.plainTransformer.toAdminInfo(admin);
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