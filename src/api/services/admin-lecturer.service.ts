import { inject, injectable } from "inversify";
import { 
    AdminLecturerServiceInterface, 
    PlainTransformerServiceInterface 
} from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
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

@injectable()
export class AdminLecturerService implements AdminLecturerServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getLecturers(lecturersQuery: LecturersQueryRequest): Promise<LecturersQueryResponse> {
        const model = {
            userId: true,
            title: true,
            user: {
                username: true,
                email: true,
            }
        }
        const prismaQuery = this.queryCreator.createQueryObject(model, lecturersQuery, { 
            fieldAlias: { 
                lecturerId: 'userId' 
            } 
        });

        const count = await this.prisma.lecturer.count({ ...prismaQuery, skip: undefined, take: undefined });
        const lecturers = await this.prisma.lecturer.findMany({
            ...prismaQuery,
            include: {
                user: true
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
                user: true,
            }
        })

        if (!lecturer) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.LecturerNotFound);
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
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                thesis: {
                    include: {
                        field: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
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
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
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
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                thesis: {
                    include: {
                        field: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
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
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                supervisor1: true,
                supervisor2: true,
            }
        });

        return oralDefenseAssessments.map(item => this.plainTransformer.toOralDefenseAssessment(item));
    }
}