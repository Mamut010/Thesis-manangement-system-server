import { inject, injectable } from "inversify";
import { AdminLecturerServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { Lecturer, User } from "../../core/models";
import { bachelorThesisAndOralDefenseInclude } from "../constants/includes";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";

@injectable()
export class AdminLecturerService implements AdminLecturerServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getLecturers(lecturersQuery: LecturersQueryRequest): Promise<LecturersQueryResponse> {
        const model = {
            ...this.queryCreator.createQueryModel(Lecturer),
            user: this.queryCreator.createQueryModel(User)
        }
        const prismaQuery = this.queryCreator.createQueryObject(model, lecturersQuery, { 
            fieldNameMap: { 
                lecturerId: 'userId' 
            } 
        });

        const count = await this.prisma.lecturer.count({ ...prismaQuery, skip: undefined, take: undefined });
        const lecturers = await this.prisma.lecturer.findMany({
            ...prismaQuery,
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        })

        const response = new LecturersQueryResponse();
        response.content = lecturers.map(item => this.plainTransformer.toLecturerInfo(item));
        response.count = count;
        return response;
    }

    async getLecturerDetail(lecturerId: number): Promise<LecturerDetailResponse> {
        const response = new LecturerDetailResponse();
        response.lecturerInfo = await this.getLecturerInfo(lecturerId);
        response.bachelorThesisRegistrations = await this.getLecturerBachelorThesisRegistrations(lecturerId);
        response.oralDefenseRegistrations = await this.getLecturerOralDefenseRegistrations(lecturerId);
        response.bachelorThesisAssessments = await this.getLecturerBachelorThesisAssessments(lecturerId);
        response.oralDefenseAssessments = await this.getLecturerOralDefenseAssessments(lecturerId);

        return response;
    }

    async getLecturerInfo(lecturerId: number): Promise<LecturerInfoDto> {
        const lecturer = await this.prisma.lecturer.findUnique({
            where: {
                userId: lecturerId
            },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        })

        if (!lecturer) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }

        return this.plainTransformer.toLecturerInfo(lecturer);
    }

    async getLecturerBachelorThesisRegistrations(lecturerId: number): Promise<BachelorThesisRegistrationDto[]> {
        const bachelorThesisRegistrations = await this.prisma.bachelorThesisRegistration.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        return bachelorThesisRegistrations.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
    }

    async getLecturerOralDefenseRegistrations(lecturerId: number): Promise<OralDefenseRegistrationDto[]> {
        const oralDefenseRegistrations = await this.prisma.oralDefenseRegistration.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        return oralDefenseRegistrations.map(item => this.plainTransformer.toOralDefenseRegistration(item));
    }

    async getLecturerBachelorThesisAssessments(lecturerId: number): Promise<BachelorThesisAssessmentDto[]> {
        const bachelorThesisAssessments = await this.prisma.bachelorThesisAssessment.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        return bachelorThesisAssessments.map(item => this.plainTransformer.toBachelorThesisAssessment(item));
    }

    async getLecturerOralDefenseAssessments(lecturerId: number): Promise<OralDefenseAssessmentDto[]> {
        const oralDefenseAssessments = await this.prisma.oralDefenseAssessment.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
            },
            include: bachelorThesisAndOralDefenseInclude,
        });

        return oralDefenseAssessments.map(item => this.plainTransformer.toOralDefenseAssessment(item));
    }
}