import { PrismaClient } from "@prisma/client";
import { ProcessRepoInterface } from "../interfaces";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { ProcessesQueryResponse } from "../../contracts/responses";
import { ProcessesQueryRequest } from "../../contracts/requests";
import { ProcessDto } from "../../shared/dtos";
import { Process } from "../../core/models";

@injectable()
export class ProcessRepo implements ProcessRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: ProcessesQueryRequest): Promise<ProcessesQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.process.count({ where: prismaQuery.where });
        const programs = await this.prisma.process.findMany(prismaQuery);

        const response = new ProcessesQueryResponse();
        response.content = programs.map(item => this.plainTransformer.toProcess(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<ProcessDto | null> {
        const record = await this.prisma.process.findUnique({
            where: {
                id: id
            },
        });

        return record ? this.plainTransformer.toProcess(record) : null;
    }

    async findManyByName(name: string): Promise<ProcessDto[]> {
        const records = await this.prisma.process.findMany({
            where: {
                name: {
                    contains: name
                }
            },
        });
        
        return records.map(item => this.plainTransformer.toProcess(item));
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Process);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}