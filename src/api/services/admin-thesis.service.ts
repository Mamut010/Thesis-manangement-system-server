import { inject, injectable } from "inversify";
import { AdminThesisServiceInterface, PlainTransformerServiceInterface } from "../interfaces";
import { ThesisInfoDto } from "../../shared/dtos";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { ThesesQueryRequest } from "../../contracts/requests/theses-query.request";
import { ThesesQueryResponse } from "../../contracts/responses/theses-query.response";

@injectable()
export class AdminThesisService implements AdminThesisServiceInterface {
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

    async getThesisInfo(thesisId: number): Promise<ThesisInfoDto> {
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
}