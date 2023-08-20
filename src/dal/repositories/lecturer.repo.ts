import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturerInfoDto } from "../../shared/dtos";
import { userInclude } from "../../shared/constants/includes";
import { anyChanges } from "../../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
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

    async query(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse> {
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

    async findOneById(id: string): Promise<LecturerInfoDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toLecturerInfo(record);
    }

    async update(id: string, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto | null> {
        let record = await this.findRecordById(id);

        if (!record) {
            return null;
        }

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

    private async findRecordById(id: string) {
        return await this.prisma.lecturer.findUnique({
            where: {
                userId: id
            },
            include: userInclude
        });
    }
}