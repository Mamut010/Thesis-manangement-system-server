import { inject, injectable } from "inversify";
import { StudentAttemptCreateRequest, StudentAttemptUpdateRequest } from "../../contracts/requests";
import { StudentAttemptDto } from "../../shared/dtos";
import { StudentAttemptRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { studentAttemptInclude } from "../constants/includes";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { PrismaClientLike } from "../../utils/types";
import { anyChanges } from "../utils/crud-helpers";

@injectable()
export class StudentAttemptRepo implements StudentAttemptRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async findOneById(id: string): Promise<StudentAttemptDto | null> {
        const record = await this.findRecordById(id);
        return record ? this.plainTransformer.toStudentAttempt(record) : null;
    }

    async findOneByStudentIdAndAttempt(studentId: string, attempt: number): Promise<StudentAttemptDto | null> {
        const record = await this.findRecordByStudentIdAndAttempt(studentId, attempt);
        return record ? this.plainTransformer.toStudentAttempt(record) : null;
    }

    async findManyByStudentId(studentId: string): Promise<StudentAttemptDto[]> {
        const records = await this.prisma.studentAttempt.findMany({
            where: { 
                studentId: studentId 
            },
            include: studentAttemptInclude,
        });
        return records.map(item => this.plainTransformer.toStudentAttempt(item));
    }

    async findOneByRequestId(requestId: string): Promise<StudentAttemptDto | null> {
        const record = await this.prisma.studentAttemptRequest.findUnique({
            where: {
                requestId: requestId
            },
            select: {
                studentAttempt: {
                    include: studentAttemptInclude
                }
            }
        });
        return record ? this.plainTransformer.toStudentAttempt(record.studentAttempt) : null;
    }

    async create(createRequest: StudentAttemptCreateRequest): Promise<StudentAttemptDto> {
        const impl = async () => {
            const { requestId, ...createData } = createRequest;
            const record = await this.prisma.studentAttempt.create({
                data: {
                    ...createData,
                    studentAttemptRequest: this.connectOrCreateStudentAttemptRequest(requestId),
                },
                include: studentAttemptInclude
            });
            return this.plainTransformer.toStudentAttempt(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentWithAttemptAlreadyExists);
    }

    async update(id: string, updateRequest: StudentAttemptUpdateRequest): Promise<StudentAttemptDto | null> {
        const impl = async () => {
            const record = await this.prisma.$transaction(async (tx) => {
                let record = await this.findRecordById(id, tx);
                if (!record) {
                    return null;
                }
    
                if (anyChanges(record, updateRequest) || typeof updateRequest.requestId !== 'undefined') {
                    const { requestId, ...updateData } = updateRequest;
                    record = await tx.studentAttempt.update({
                        where: {
                            id: id
                        },
                        data: {
                            ...updateData,
                            studentAttemptRequest: this.connectOrCreateStudentAttemptRequest(requestId),
                        },
                        include: studentAttemptInclude
                    });
                }
        
                return record;
            });
            return record ? this.plainTransformer.toStudentAttempt(record) : null;
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisAssessment);
    }

    async updateByStudentIdAndAttempt(studentId: string, attempt: number, updateRequest: StudentAttemptUpdateRequest)
        : Promise<StudentAttemptDto | null> {
        const impl = async () => {
            const record = await this.prisma.$transaction(async (tx) => {
                let record = await this.findRecordByStudentIdAndAttempt(studentId, attempt, tx);
                if (!record) {
                    return null;
                }
    
                if (anyChanges(record, updateRequest)) {
                    const { requestId, ...updateData } = updateRequest;
                    record = await tx.studentAttempt.update({
                        where: {
                            studentId_attemptNo: {
                                studentId: studentId,
                                attemptNo: attempt
                            }
                        },
                        data: {
                            ...updateData,
                            studentAttemptRequest: this.connectOrCreateStudentAttemptRequest(requestId),
                        },
                        include: studentAttemptInclude
                    });
                }
        
                return record;
            });
            return record ? this.plainTransformer.toStudentAttempt(record) : null;
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisAssessment);
    }

    async delete(id: string): Promise<boolean> {
        const { count } = await this.prisma.studentAttempt.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async deleteByStudentIdAndAttempt(studentId: string, attempt: number): Promise<boolean> {
        const { count } = await this.prisma.studentAttempt.deleteMany({
            where: {
                studentId: studentId,
                attemptNo: attempt,
            }
        });
        return count > 0;
    }

    private connectOrCreateStudentAttemptRequest(requestId?: string) {
        return requestId ? {
            connectOrCreate: {
                where: { requestId },
                create: { requestId },
            }
        } : undefined;
    }

    private findRecordById(id: string, prisma: PrismaClientLike = this.prisma) {
        return prisma.studentAttempt.findUnique({
            where: {
                id: id
            },
            include: studentAttemptInclude
        });
    }

    private findRecordByStudentIdAndAttempt(studentId: string, attempt: number, prisma: PrismaClientLike = this.prisma) {
        return prisma.studentAttempt.findUnique({
            where: {
                studentId_attemptNo: {
                    studentId: studentId,
                    attemptNo: attempt,
                }
            },
            include: studentAttemptInclude
        });
    }
}