import { inject, injectable } from "inversify";
import { ThesisServiceInterface, PlainTransformerServiceInterface } from "../interfaces";
import { ThesisDto } from "../../shared/dtos";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { ThesesQueryRequest } from "../../contracts/requests/theses-query.request";
import { ThesesQueryResponse } from "../../contracts/responses/theses-query.response";
import { ThesisCreateRequest } from "../../contracts/requests/thesis-create.request";

@injectable()
export class ThesisService implements ThesisServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getTheses(thesesQuery: ThesesQueryRequest): Promise<ThesesQueryResponse> {
        const where: Prisma.ThesisWhereInput = {
            id: this.queryCreator.createFilteringObject(thesesQuery.thesisIdFilter),
            title: this.queryCreator.createFilteringObject(thesesQuery.titleFilter),
            slot: this.queryCreator.createFilteringObject(thesesQuery.slotFilter),
            slotLimit: this.queryCreator.createFilteringObject(thesesQuery.slotLimitFilter),
            topic: {
                title: this.queryCreator.createFilteringObject(thesesQuery.topicFilter)
            },
            field: {
                title: this.queryCreator.createFilteringObject(thesesQuery.fieldFilter)
            },
        };
        const fieldMap = {
            id: 'id',
            title: 'title',
            slot: 'slot',
            slotLimit: 'slotLimit',
            topic: 'topic.title',
            field: 'field.title',
        };

        const count = await this.prisma.thesis.count({ where });
        const theses = await this.prisma.thesis.findMany({
            where: where,
            include: {
                topic: true,
                field: true,
            },
            orderBy: this.queryCreator.createOrderByObject(thesesQuery.orderBy, { fieldMap, ignoreUnmapped: true }),
            ...this.queryCreator.createPaginationObject(thesesQuery.pagination)
        });

        const response = new ThesesQueryResponse();
        response.content = theses.map(item => this.plainTransformer.toThesisInfo(item));
        response.count = count;
        return response;
    }

    async getThesis(thesisId: number): Promise<ThesisDto> {
        const thesis = await this.prisma.thesis.findUnique({
            where: {
                id: thesisId
            },
            include: {
                topic: true,
                field: true,
            }
        });

        if (!thesis) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.StudentNotFound);
        }

        return this.plainTransformer.toThesisInfo(thesis);
    }

    async createThesis(createRequest: ThesisCreateRequest): Promise<ThesisDto> {
        const thesis = await this.prisma.thesis.create({
            data: createRequest,
            include: {
                topic: true,
                field: true,
            }
        });

        return this.plainTransformer.toThesisInfo(thesis);
    }

    async updateThesis(thesisId: number, updateRequest: ThesisCreateRequest): Promise<ThesisDto> {
        try {
            await this.prisma.thesis.findUniqueOrThrow({
                where: {
                    id: thesisId
            }});
        }
        catch {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.ThesisNotFound);
        }

        const thesis = await this.prisma.thesis.update({
            where: {
                id: thesisId
            },
            data: updateRequest,
            include: {
                topic: true,
                field: true
            }
        });

        return this.plainTransformer.toThesisInfo(thesis);
    }

    async deleteThesis(thesisId: number): Promise<void> {
        try {
            await this.prisma.thesis.findUniqueOrThrow({
                where: {
                    id: thesisId
            }});
        }
        catch {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.ThesisNotFound);
        }

        await this.prisma.thesis.delete({
            where: {
                id: thesisId
            }
        });
    }
}