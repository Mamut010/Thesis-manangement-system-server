import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturerDto } from "../../shared/dtos";
import { userWithRoleInclude } from "../constants/includes";
import { anyChanges } from "../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { LecturerRepoInterface } from "../interfaces";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { Lecturer, User } from "../../core/models";

@injectable()
export class LecturerRepo implements LecturerRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async query(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        
        const count = await this.prisma.lecturer.count({ where: prismaQuery.where });
        const lecturers = await this.prisma.lecturer.findMany({
            ...prismaQuery,
            include: userWithRoleInclude
        })

        const response = new LecturersQueryResponse();
        response.content = lecturers.map(item => this.plainTransformer.toLecturerInfo(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<LecturerDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toLecturerInfo(record);
    }

    async update(id: string, updateRequest: LecturerUpdateRequest): Promise<LecturerDto | null> {
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
                    signature: updateRequest.signature,
                    user: {
                        update: {
                            email: updateRequest.email,
                            role: updateRequest.type ? {
                                connect: {
                                    name: updateRequest.type
                                }
                            } : undefined
                        }
                    }
                },
                include: userWithRoleInclude
            });
        }

        return this.plainTransformer.toLecturerInfo(record);
    }

    private async findRecordById(id: string) {
        return await this.prisma.lecturer.findUnique({
            where: {
                userId: id
            },
            include: userWithRoleInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = {
            ...this.queryCreator.createQueryModel(Lecturer),
            user: this.queryCreator.createQueryModel(User)
        }
        const fieldMap = {
            type: 'user.role.name'
        };
        return this.queryCreator.createQueryObject(model, queryRequest, { 
            fieldNameMap: { 
                lecturerId: 'userId' 
            },
            fieldMap 
        });
    }
}