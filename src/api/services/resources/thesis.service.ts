import { inject, injectable } from "inversify";
import { ThesisServiceInterface } from "../../interfaces";
import { ThesisDto } from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { ThesesQueryRequest } from "../../../contracts/requests/resources/theses-query.request";
import { ThesesQueryResponse } from "../../../contracts/responses/resources/theses-query.response";
import { ThesisCreateRequest } from "../../../contracts/requests/resources/thesis-create.request";
import { PlainTransformerInterface } from "../../utils/plain-transformer";
import { compareObjectByEntries, isObjectEmptyOrAllUndefined } from "../../../utils/object-helpers";
import { Thesis } from "../../../core/models";

@injectable()
export class ThesisService implements ThesisServiceInterface {
    private static readonly include = {
        topic: true,
        field: true,
    } as const;

    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getTheses(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse> {
        const fieldMap = {
            topicTitle: 'topic.title',
            fieldTitle: 'field.title',
        };
        const model = this.queryCreator.createQueryModel(Thesis);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });

        const count = await this.prisma.thesis.count({ where: prismaQuery.where });
        const theses = await this.prisma.thesis.findMany({
            ...prismaQuery,
            include: ThesisService.include
        });

        const response = new ThesesQueryResponse();
        response.content = theses.map(item => this.plainTransformer.toThesis(item));
        response.count = count;
        return response;
    }

    async getThesis(id: number): Promise<ThesisDto> {
        const thesis = await this.ensureRecordExists(id);
        return this.plainTransformer.toThesis(thesis);
    }

    async createThesis(createRequest: ThesisCreateRequest): Promise<ThesisDto> {
        const thesis = await this.prisma.thesis.create({
            data: createRequest,
            include: ThesisService.include
        });

        return this.plainTransformer.toThesis(thesis);
    }

    async updateThesis(id: number, updateRequest: ThesisCreateRequest): Promise<ThesisDto> {
        let record = await this.ensureRecordExists(id);
        if (!isObjectEmptyOrAllUndefined(updateRequest) && !compareObjectByEntries(record, updateRequest)) {
            record = await this.prisma.thesis.update({
                where: {
                    id: id
                },
                data: updateRequest,
                include: ThesisService.include
            });
        }

        return this.plainTransformer.toThesis(record);
    }

    async deleteThesis(id: number): Promise<void> {
        await this.ensureRecordExists(id);

        await this.prisma.thesis.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.thesis.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: ThesisService.include
            });
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }
    }
}