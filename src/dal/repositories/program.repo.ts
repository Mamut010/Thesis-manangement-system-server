import { inject, injectable } from "inversify";
import { ProgramRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { ProgramsQueryRequest, ProgramCreateRequest, ProgramUpdateRequest } from "../../contracts/requests";
import { ProgramsQueryResponse } from "../../contracts/responses";
import { Program } from "../../core/models";
import { ProgramDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";

@injectable()
export class ProgramRepo implements ProgramRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: ProgramsQueryRequest): Promise<ProgramsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.program.count({ where: prismaQuery.where });
        const programs = await this.prisma.program.findMany(prismaQuery);

        const response = new ProgramsQueryResponse();
        response.content = programs.map(item => this.plainTransformer.toProgram(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<ProgramDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toProgram(record);
    }

    async create(createRequest: ProgramCreateRequest): Promise<ProgramDto> {
        const impl = async () => {
            const record = await this.prisma.program.create({
                data: createRequest
            });
            return this.plainTransformer.toProgram(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.ProgramAlreadyExists);
    }

    async update(id: number, updateRequest: ProgramUpdateRequest): Promise<ProgramDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }
    
            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.program.update({
                    where: {
                        id: id
                    },
                    data: updateRequest
                });
            }
    
            return this.plainTransformer.toProgram(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.ProgramAlreadyExists);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.program.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: number) {
        return await this.prisma.program.findUnique({
            where: {
                id: id
            },
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Program);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}