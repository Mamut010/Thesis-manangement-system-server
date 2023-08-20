import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturerInfoDto } from "../dtos";
import { LecturerRoles } from "../../core/constants/roles";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { userInclude } from "../constants/includes";
import { anyChanges } from "../../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { PlainTransformerInterface } from "../utils/plain-transformer";
import { LecturerRepoInterface } from "../interfaces";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { Lecturer, User } from "../../core/models";

@injectable()
export class LecturerRepo implements LecturerRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async getLecturers(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse> {
        const model = {
            ...this.queryCreator.createQueryModel(Lecturer),
            user: this.queryCreator.createQueryModel(User)
        }
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest, { 
            fieldNameMap: { 
                lecturerId: 'userId' 
            } 
        });

        const count = await this.prisma.lecturer.count({ where: prismaQuery.where });
        const lecturers = await this.prisma.lecturer.findMany({
            ...prismaQuery,
            include: userInclude
        })

        const response = new LecturersQueryResponse();
        response.content = lecturers.map(item => this.plainTransformer.toLecturerInfo(item));
        response.count = count;
        return response;
    }

    async getLecturerInfo(id: number): Promise<LecturerInfoDto> {
        const lecturer = await this.ensureRecordExists(id);
        return this.plainTransformer.toLecturerInfo(lecturer);
    }

    async updateLecturer(id: number, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto> {
        // Check if 'type' is a lecturer role
        // Note: This assumes that the roles are predefined and won't be changed later on
        if (updateRequest.type && !LecturerRoles.some(item => item === updateRequest.type)) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.RoleInvalid);
        }

        let record = await this.ensureRecordExists(id);

        if (anyChanges(flattenObject(record), updateRequest)) {
            record = await this.prisma.lecturer.update({
                where: {
                    userId: id
                },
                data: {
                    title: updateRequest.title,
                    numberOfTheses: updateRequest.numberOfTheses,
                    bio: updateRequest.bio,
                    user: {
                        update: {
                            email: updateRequest.email,
                            signature: updateRequest.signature,
                            role: updateRequest.type ? {
                                connect: {
                                    name: updateRequest.type
                                }
                            } : undefined
                        }
                    }
                },
                include: userInclude
            });
        }

        return this.plainTransformer.toLecturerInfo(record);
    }

    private async ensureRecordExists(id: number) {
        const lecturer = await this.prisma.lecturer.findUnique({
            where: {
                userId: id
            },
            include: userInclude
        });

        if (!lecturer) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }

        return lecturer;
    }
}