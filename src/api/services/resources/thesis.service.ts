import { inject, injectable } from "inversify";
import { ThesisServiceInterface, PlainTransformerServiceInterface } from "../../interfaces";
import { ThesisDto } from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../../core/constants/not-found-error-message";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { ThesesQueryRequest } from "../../../contracts/requests/resources/theses-query.request";
import { ThesesQueryResponse } from "../../../contracts/responses/resources/theses-query.response";
import { ThesisCreateRequest } from "../../../contracts/requests/resources/thesis-create.request";

@injectable()
export class ThesisService implements ThesisServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async getTheses(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse> {
        const where: Prisma.ThesisWhereInput = {
            id: this.queryCreator.createFilteringObject(queryRequest.thesisIdFilter),
            title: this.queryCreator.createFilteringObject(queryRequest.titleFilter),
            slot: this.queryCreator.createFilteringObject(queryRequest.slotFilter),
            slotLimit: this.queryCreator.createFilteringObject(queryRequest.slotLimitFilter),
            topic: {
                title: this.queryCreator.createFilteringObject(queryRequest.topicFilter)
            },
            field: {
                title: this.queryCreator.createFilteringObject(queryRequest.fieldFilter)
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
            orderBy: this.queryCreator.createOrderByObject(queryRequest.orderBy, { fieldMap, ignoreUnmapped: true }),
            ...this.queryCreator.createPaginationObject(queryRequest.pagination)
        });

        const response = new ThesesQueryResponse();
        response.content = theses.map(item => this.plainTransformer.toThesis(item));
        response.count = count;
        return response;
    }

    async getThesis(id: number): Promise<ThesisDto> {
        const thesis = await this.prisma.thesis.findUnique({
            where: {
                id: id
            },
            include: {
                topic: true,
                field: true,
            }
        });

        if (!thesis) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.ThesisNotFound);
        }

        return this.plainTransformer.toThesis(thesis);
    }

    async createThesis(createRequest: ThesisCreateRequest): Promise<ThesisDto> {
        const thesis = await this.prisma.thesis.create({
            data: createRequest,
            include: {
                topic: true,
                field: true,
            }
        });

        return this.plainTransformer.toThesis(thesis);
    }

    async updateThesis(id: number, updateRequest: ThesisCreateRequest): Promise<ThesisDto> {
        await this.ensureRecordExists(id);

        const thesis = await this.prisma.thesis.update({
            where: {
                id: id
            },
            data: updateRequest,
            include: {
                topic: true,
                field: true
            }
        });

        return this.plainTransformer.toThesis(thesis);
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
            }});
        }
        catch {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.ThesisNotFound);
        }
    }
}